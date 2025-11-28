from fastapi import APIRouter, Depends, HTTPException
from app import schemas, models, auth
from app.services.sandbox_service import sandbox_service

router = APIRouter(
    prefix="/sandbox",
    tags=["sandbox"],
    dependencies=[Depends(auth.get_current_user)]
)

@router.post("/execute", response_model=schemas.SandboxResponse)
def execute_code(
    request: schemas.SandboxRequest,
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Execute Python code in a secure sandboxed environment.
    """
    # Future: Rate limiting based on user ID
    # Future: Store execution history in DB
    
    result = sandbox_service.run_code(request.code, request.language)
    
    if result["status"] == "error" and "Sandbox environment not available" in str(result.get("error", "")):
         raise HTTPException(status_code=503, detail=result["error"])
         
    return result
