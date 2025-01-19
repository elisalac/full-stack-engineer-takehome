<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    // Set response headers
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    session_start();

    // Path to the JSON file
    define("USER_DATA_FILE", "data.json");

    // Helper function to respond with JSON
    function respond(string $status, string $message, $data = null) {
        echo json_encode([
            "status" => $status,
            "message" => $message,
            "data" => $data
        ]);
        exit;
    }

    // Load users from the JSON file
    function loadUsers(): array {
        return file_exists(USER_DATA_FILE) ? json_decode(file_get_contents(USER_DATA_FILE), true) ?? [] : [];
    }

    // Save users to the JSON file
    function saveUsers(array $users): void {
        file_put_contents(USER_DATA_FILE, json_encode($users, JSON_PRETTY_PRINT));
    }

    // Process POST request
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input["action"])) {
            respond("error", "Invalid action");
        }

        switch ($input["action"]) {
            case "login":
                login($input);
                break;

            case "logout":
                logout();
                break;

            case "create":
                createUser($input);
                break;

            default:
                respond("error", "Invalid action");
        }

    } elseif ($_SERVER["REQUEST_METHOD"] === "GET") {
        // Check if user is logged in
        if (isset($_SESSION["user"])) {
            respond("success", "User is logged in", $_SESSION["user"]);
        } else {
            respond("error", "No user is logged in");
        }

    } else {
        respond("error", "Invalid request method");
    }

    // Login function
    function login(array $input) {
        $username = $input["username"] ?? "";
        $password = $input["password"] ?? "";

        $users = loadUsers();

        foreach ($users as $user) {
            if ($user["username"] === $username && $user["password"] === $password) {
                $_SESSION["user"] = $user;
                respond("success", "Login successful", ["id" => $user["id"], "username" => $user["username"]]);
            }
        }

        respond("error", "Invalid username or password");
    }

    // Logout function
    function logout() {
        if (isset($_SESSION["user"])) {
            unset($_SESSION["user"]);
            session_destroy();
            respond("success", "Logout successful");
        } else {
            respond("error", "No user is logged in");
        }
    }

    // Create user function
    function createUser(array $input) {
        $username = $input["username"] ?? "";
        $password = $input["password"] ?? "";

        // Validate input
        if (empty($username) || empty($password)) {
            respond("error", "Username and password are required");
        }

        $users = loadUsers();

        // Check if the username already exists
        foreach ($users as $user) {
            if ($user["username"] === $username) {
                respond("error", "Username already exists");
            }
        }

        // Create new user
        $newUser = [
            "id" => (string)count($users),
            "username" => $username,
            "password" => $password
        ];

        // Add the new user and save to the JSON file
        $users[] = $newUser;
        saveUsers($users);

        respond("success", "User created successfully", ["id" => $newUser["id"], "username" => $newUser["username"]]);
    }
?>