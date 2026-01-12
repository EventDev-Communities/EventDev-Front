import fs from 'fs'

if (!fs.existsSync('.env')) {
  fs.copyFileSync('.env.dev.example', '.env')
  console.log('.env file created successfully!')
} else {
  console.log('.env file already exists')
}
