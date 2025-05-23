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
    // Cleanup before test to avoid container name conflicts
    sh 'docker rm -f node-api || exit 0'
    sh 'docker rm -f companydb || exit 0'

    // Start services and run tests
    sh 'docker-compose -f docker-compose.yml up -d --build'
    sh 'docker exec node-api npm test || exit 0'

    // Teardown
    sh 'docker-compose down || exit 0'
  }
}





    stage('Security Scan') {
      steps {
        sh 'trivy image node-api || true'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker rm -f node-api || exit 0'
        sh 'docker run -d -p 3000:3000 --name node-api --env DB_HOST=host.docker.internal --env DB_USER=root --env DB_PASSWORD=1234 --env DB_DATABASE=companydb --env PORT=3000 node-api'
      }
    }

    stage('Release') {
      steps {
        script {
          def tag = "v1.0-${env.BUILD_NUMBER}"
          sh "git tag -a ${tag} -m \"Release ${tag}\""
          sh "git push origin ${tag}"
        }
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
