pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t node-api .'
      }
    }

    stage('Test') {
      steps {
        sh 'npm install'
        sh 'npm test'
      }
    }

    stage('Code Quality') {
      steps {
        sh 'sonar-scanner'
      }
    }

    stage('Security Scan') {
      steps {
        sh 'trivy image node-api || true'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker run -d -p 3000:3000 --name node-api node-api'
      }
    }

    stage('Release') {
      steps {
        sh 'git tag -a v1.0 -m "Release v1.0"'
        sh 'git push origin v1.0'
      }
    }

    stage('Monitoring') {
      steps {
        echo 'Showing container logs (last 10 lines):'
        sh 'docker logs node-api --tail 10'
      }
    }
  }
}
