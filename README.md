This is a full-stack ticketing platform that allows users to create, list, purchase, and manage event tickets. The application is built using a microservices architecture, where each service is independently deployable, containerized with Docker, and orchestrated using Kubernetes. It leverages NATS Streaming for event-driven communication between services and MongoDB for persistence. This project was designed to explore the patterns and best practices of building distributed systems in production-like environments.


## Core Backend Services

- **NodeJs**
- **Express**
- **TypeScript**
- **MongoDB**
- **Mongoose**

## Microservices & Communication

- **NATS Streaming**
- **Shared Custom NPM Module**

## Containerization & Orchestration
 
- **Docker**
- **Kubernetes**
- **Skaffold**

## Frontend

- **Next.js**
- **React**

## Testing

- **Jest**
- **Supertest**

## CI/CD

- **GitHub Actions**


## Getting Started

## ⚠️ **ATTENTION:** 
Make sure you only use WSL2 (If you are on Windows) for command line

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/NikaPanchulidze/Ticketing

2. **Navigate to the Project Directory:**
   ```
   cd Ticketing
   ```

## ⚠️ **ATTENTION:** 
Before running or deploying this application locally, ensure you have the following tools installed and properly configured:

- **Docker**
- **Kubernetes**
- **skaffold**
- **WSL2**

3. **Change local host port to domain name:**
   ```
   sudo nano /mnt/c/Windows/System32/drivers/etc/hosts
   ```

Add:
127.0.0.1 ticketing.dev

4. **Create Kubectl secrets:**
  ```
  kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
  ```

  ```
  kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51PM8xaDXCd7QZHzlPIprHT6tERWXUvOFUVM9M4Ok2kl5asyyVi7mPpzzm063Lon0DLoMnsORJoegcQvealFJoRyX00QdNP2PHT
  ```
  
  ```
  kubectl create secret generic stripe-pub-secret --from-literal NEXT_PUBLIC_STRIPE_KEY=pk_test_51PM8xaDXCd7QZHzlCEdvy5Rj9PJeeewLauRxACV5PAPcLm9J2m7nln5KQwNK2dcINz3L8y4BPkU1LPttUfCgQreH00cnLfL55H
  ```

5. **Start Kubernetes Cluster**
  ```
  skaffold dev
  ```


## ⚠️ **ATTENTION:** 
If errors appear in the wsl2, try to restart Skaffold again.

6. **Open new tab in terminal and write**
  ```
  kubectl get pods
  ```

7. **Copy pod's name which starts with "nats" and write this command**
  ```
  kubectl port-forward <nats-depl-58c6f87dff-nz9zr> 4222:4222
  ```

## You can now test application in browser

**Write in url:**
  ```
  ticketing.dev
  ```

## Manual testing
You can use already written tests to check if code works properly.

1. **Navigate to the desired service:**
   ```bash
   cd ticketing

2. **Start jest and wait:**
   ```bash
   npm run test
   ```







