pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        bat 'docker build -t node-api .'
      }
    }

    stage('Test') {
      steps {
        bat 'set NODE_ENV=test && ping -n 6 127.0.0.1 > nul && npm test'
      }
    }

    stage('Code Quality') {
      steps {
        bat 'sonar-scanner'
      }
    }

    stage('Security Scan') {
      steps {
        bat 'trivy image node-api || true'
      }
    }

    stage('Deploy') {
      steps {
        bat 'docker rm -f node-api || exit 0'
        bat 'docker run -d -p 3000:3000 --name node-api --env DB_HOST=host.docker.internal --env DB_USER=root --env DB_PASSWORD=1234 --env DB_DATABASE=companydb --env PORT=3000 node-api'
      }
    }

    stage('Release') {
      steps {
        bat 'git tag -a v1.0 -m "Release v1.0" || echo "Tag exists"'
        bat 'git push origin v1.0 || echo "Already pushed"'
      }
    }

    stage('Monitoring') {
      steps {
        echo 'Showing container logs (last 10 lines):'
        bat 'docker logs node-api --tail 10'
      }
    }
  }
}
