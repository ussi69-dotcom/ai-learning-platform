import docker
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

class SandboxService:
    """
    Service for executing untrusted user code in isolated Docker containers.
    Uses 'Sibling Container' pattern via mounted /var/run/docker.sock.
    """
    
    def __init__(self):
        try:
            self.client = docker.from_env()
        except Exception as e:
            logger.error(f"Failed to initialize Docker client: {e}")
            self.client = None

    def run_code(self, code: str, language: str = "python") -> Dict[str, Any]:
        """
        Executes code in a secure, ephemeral container.
        """
        if not self.client:
            return {"status": "error", "error": "Sandbox environment not available (Docker socket missing?)"}

        # Configuration
        image = "python:3.11-slim"
        # Constraints to prevent abuse
        mem_limit = "128m"
        cpu_period = 100000
        cpu_quota = 50000  # 50% of 1 CPU
        timeout_seconds = 5
        
        container = None
        try:
            # Create the command. We use python -c.
            # We wrap user code in a try/except block inside the container could be useful, 
            # but for raw output, running it directly is fine.
            # IMPORTANT: We assume 'code' is just a script.
            
            # Escape double quotes for the shell argument if needed, 
            # but passing as list to 'command' handles arg parsing safely.
            cmd = ["python", "-c", code]

            container = self.client.containers.run(
                image=image,
                command=cmd,
                detach=True,
                mem_limit=mem_limit,
                cpu_period=cpu_period,
                cpu_quota=cpu_quota,
                network_disabled=True, # No internet access for now
                working_dir="/app",
                # Remove container automatically ONLY if we don't need to inspect it after stop.
                # But we need logs. So auto_remove=False.
                auto_remove=False, 
            )

            try:
                # Wait for result with timeout
                result = container.wait(timeout=timeout_seconds)
                exit_code = result.get('StatusCode', 0)
                
                # Get logs (stdout + stderr)
                logs = container.logs().decode('utf-8')
                
                if exit_code == 0:
                    return {"status": "success", "output": logs}
                else:
                    return {"status": "error", "output": logs, "exit_code": exit_code}

            except Exception as e:
                # Timeout or other runtime error
                container.kill()
                return {"status": "timeout", "error": "Execution timed out (Max 5s)."}

        except docker.errors.ImageNotFound:
            return {"status": "error", "error": f"Docker image '{image}' not found. Please pull it first."}
        except Exception as e:
            logger.exception("Sandbox execution failed")
            return {"status": "error", "error": str(e)}
        finally:
            # Cleanup: Always remove the container
            if container:
                try:
                    container.remove(force=True)
                except Exception:
                    pass

sandbox_service = SandboxService()
