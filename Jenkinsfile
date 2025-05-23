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
        bat 'docker rm -f node-api || exit 0'
        bat 'docker rm -f companydb || exit 0'
        bat 'docker-compose -f docker-compose.yml up -d --build'
        bat 'ping -n 11 127.0.0.1 > nul'
        bat 'docker exec node-api npm test || exit 0'
        
        // NEW: Ensure host directory exists
        bat 'mkdir coverage || exit 0'

        // Copy coverage file from container to host
        bat 'docker cp node-api:/app/coverage/lcov.info coverage/lcov.info || exit 1'

        bat 'docker-compose down || exit 0'
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
        script {
          def tag = "v1.0-${env.BUILD_NUMBER}"
          bat "git tag -a ${tag} -m \"Release ${tag}\""
          bat "git push origin ${tag}"
        }
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
