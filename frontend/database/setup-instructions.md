
# Database Setup Instructions

This document provides instructions for setting up the SecureBank database with different technologies.

## Option 1: Using Supabase (Recommended)

1. Sign up for a free Supabase account at https://supabase.com
2. Create a new project
3. In the SQL Editor, run the contents of `database/schema.sql`
4. Update your environment variables:
   ```
   SUPABASE_URL=your_project_url
   SUPABASE_ANON_KEY=your_anon_key
   ```

## Option 2: Using PostgreSQL Locally

1. Install PostgreSQL on your system
2. Create a new database:
   ```sql
   CREATE DATABASE securebank;
   ```
3. Run the schema file:
   ```bash
   psql -d securebank -f database/schema.sql
   ```

## Option 3: Using MySQL/MariaDB

1. Install MySQL or MariaDB
2. Create a new database:
   ```sql
   CREATE DATABASE securebank;
   ```
3. Modify the schema file to use MySQL syntax:
   - Replace `UUID` with `VARCHAR(36)`
   - Replace `gen_random_uuid()` with `UUID()`
   - Adjust timestamp syntax as needed

## Option 4: Using SQLite (Development only)

1. Install SQLite3
2. Create the database:
   ```bash
   sqlite3 securebank.db < database/schema.sql
   ```

## PHP Backend Setup

If you want to create a PHP backend to connect to this database:

### 1. Install XAMPP/WAMP
- Download from https://www.apachefriends.org/
- Install and start Apache and MySQL services

### 2. Create PHP API Files

Create these files in your `htdocs` folder:

#### config/database.php
```php
<?php
class Database {
    private $host = "localhost";
    private $db_name = "securebank";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, 
                                $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
```

#### api/auth.php
```php
<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $data->email;
    $password = $data->password;
    
    $query = "SELECT id, email, first_name, last_name, password_hash FROM users WHERE email = ?";
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (password_verify($password, $row['password_hash'])) {
            unset($row['password_hash']);
            echo json_encode(array("success" => true, "user" => $row));
        } else {
            echo json_encode(array("success" => false, "message" => "Invalid credentials"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "User not found"));
    }
}
?>
```

### 3. Update React App to Use PHP API

Update your React authentication context to call PHP endpoints:

```typescript
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost/securebank/api/auth.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('bankUser', JSON.stringify(data.user));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};
```

## Security Considerations

1. **Password Hashing**: Always use `password_hash()` and `password_verify()` in PHP
2. **SQL Injection**: Use prepared statements for all database queries
3. **HTTPS**: Always use HTTPS in production
4. **Environment Variables**: Store sensitive data in environment variables
5. **Input Validation**: Validate all user inputs on both client and server side
6. **Rate Limiting**: Implement rate limiting for authentication endpoints
7. **CORS**: Configure CORS properly for production

## Sample Environment Variables

Create a `.env` file:

```
DB_HOST=localhost
DB_NAME=securebank
DB_USER=root
DB_PASS=
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here
```
