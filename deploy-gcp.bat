@echo off
echo ========================================
echo   GCP Frontend Deployment Script
echo ========================================
echo.

REM Set your GCP project details
set PROJECT_ID=researchers-platform
set SERVICE_NAME=researchers-frontend
set REGION=asia-south1

echo Step 1: Building Docker image...
gcloud builds submit --tag gcr.io/%PROJECT_ID%/%SERVICE_NAME%

echo.
echo Step 2: Deploying to Cloud Run...
gcloud run deploy %SERVICE_NAME% ^
  --image gcr.io/%PROJECT_ID%/%SERVICE_NAME% ^
  --platform managed ^
  --region %REGION% ^
  --allow-unauthenticated ^
  --port 8080 ^
  --memory 256Mi ^
  --cpu 1 ^
  --min-instances 0 ^
  --max-instances 5

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your frontend URL will be displayed above
echo Update VITE_API_URL in .env with backend URL
pause
