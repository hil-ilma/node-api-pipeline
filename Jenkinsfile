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
        bat 'npm install'
        bat 'npm test'
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
        bat '''
        docker rm -f node-api || exit 0
        docker run -d -p 3000:3000 --name node-api ^
            -e DB_HOST=host.docker.internal ^
            -e DB_USER=root ^
            -e DB_PASSWORD=1234 ^
            -e DB_NAME=companydb ^
            node-api
        '''
    }
    }


    stage('Release') {
      steps {
        bat 'git tag -a v1.0 -m "Release v1.0"'
        bat 'git push origin v1.0'
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
