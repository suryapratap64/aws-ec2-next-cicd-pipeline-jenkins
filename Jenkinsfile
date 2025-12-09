node {
    def appDir = '/var/www/nextjs-app'

    stage('Clean Workspace') {
        echo 'Cleaning Jenkins Workspace'
        deleteDir()
    }

    stage('Clone Repo') {
        echo 'Cloning the repo'
        git(
            branch: 'main',
            url: 'https://github.com/suryapratap64/aws-ec2-next-cicd-pipeline-jenkins'
        )
    }

    stage('Deploy to EC2') {
        echo 'Deploying to EC2'

        sh """
            sudo mkdir -p ${appDir}
            sudo chown -R jenkins:jenkins ${appDir}

            rsync -av --delete --exclude='.git' --exclude='node_modules' ./ ${appDir}/

            cd ${appDir}

            # Remove old node_modules and lock file to avoid conflicts
            rm -rf node_modules package-lock.json

            # Install dependencies without sudo
            npm install

            npm run build

            # Kill current process on 3000 if running
            sudo fuser -k 3000/tcp || true

            # Restart app with PM2
            npx pm2 delete next-app || true
            npx pm2 start npm --name next-app -- run start
            npx pm2 save
        """
    }
}


// node {
//     def appDir='/var/www/nextjs-app'
//     stage('Clean Workspace'){
//         echo 'Cleaning Jenkins Workspace'
//         deleteDir()
//     }
//     stage('Clone Repo'){
//         echo 'Cloning the repo'
//         git(
//             branch:'main',
//             url:'https://github.com/suryapratap64/aws-ec2-next-cicd-pipeline-jenkins'
//         )
//     }
//     stage('Deploy to EC2'){
//         echo 'Deploying to ec2'
//         sh """
//           sudo mkdir -p ${appDir}
//           sudo chown -R
//           jenkins:jenkins ${appDir}
//           rsync -av --delete
//            --exclude='.git'
//            --exclude='node_modules' ./ ${appDir}

//            cd ${appDir}
//            sudo npm install
//            sudo npm run build
//            sudo fuser -k 3000/tcp || true
//            npm run start

        
//         """
//     }

// }