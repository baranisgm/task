First use the below command

npm install

Run the server:

src/server.ts

User Registration:
POST /api/auth/register with { "username": "new_user", "password": "password123" }


User Login:
POST /api/auth/login with { "username": "new_user", "password": "password123" }


Import Chat History:
POST /api/chat/import with a file upload (Excel file) containing chat history.
