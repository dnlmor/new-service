import yaml
import subprocess
import time
import requests
from concurrent.futures import ThreadPoolExecutor

def run_service(service_name, command, directory):
    print(f"Starting {service_name}...")
    process = subprocess.Popen(command, shell=True, cwd=directory)
    return process

def wait_for_service(url, max_retries=30, delay=2):
    for _ in range(max_retries):
        try:
            requests.get(url)
            return True
        except requests.ConnectionError:
            time.sleep(delay)
    return False

def main():
    with open('services.yml', 'r') as file:
        services = yaml.safe_load(file)['services']

    with ThreadPoolExecutor() as executor:
        processes = {
            service_name: executor.submit(run_service, service_name, service['command'], service['directory'])
            for service_name, service in services.items()
        }

    # Wait for CRUD and Client services to be available
    if not wait_for_service('http://localhost:8001'):
        print("CRUD service failed to start")
        return
    if not wait_for_service('http://localhost:3000'):
        print("Client service failed to start")
        return

    print("All services are running. Press Ctrl+C to stop.")

    try:
        # Wait for all processes to complete (which they won't, unless there's an error)
        for future in processes.values():
            future.result()
    except KeyboardInterrupt:
        print("Stopping all services...")
    finally:
        for process in processes.values():
            process.result().terminate()

if __name__ == "__main__":
    main()
