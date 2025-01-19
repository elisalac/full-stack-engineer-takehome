<?php
    header("Access-Control-Allow-Origin: http://localhost:3002");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $filePath = "data.json";

    function getAllContent(string $filePath): array {
        if (file_exists($filePath)) {
            $jsonData = file_get_contents($filePath);
            return $jsonData ? json_decode($jsonData, true) : [];
        }
        return [];
    }

    function saveContent(string $filePath, array $data): void {
        file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
    }

    if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['get_all'])) {
        $content = getAllContent($filePath);
        echo json_encode($content);
        exit();
    }

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Get the raw POST data
        $data = json_decode(file_get_contents("php://input"), true);

        // Ensure 'name' is provided in the request body
        if (isset($data['name'])) {
            $content = getAllContent($filePath);
            // Create a new document object with an id, name, and empty data
            $newDocument = [
                "id" => strval(count($content)), // Use count of documents to generate unique id
                "name" => $data['name'],
                "data" => [
                    "ops" => []
                ]
            ];

            // Add the new document to the array of documents
            $content[] = $newDocument;

            // Write the updated array of documents back to the JSON file
            file_put_contents($filePath, json_encode($content, JSON_PRETTY_PRINT));

            // Respond with the created document data (including the new ID)
            echo json_encode($newDocument);
        } else {
            // If 'name' is not provided, send an error response
            http_response_code(400);
            echo json_encode(["error" => "Name is required"]);
        }
    }

    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $input = file_get_contents("php://input");
        if ($input) {
    
            $receivedData = json_decode($input, true);
            if ($receivedData) {
    
                if (isset($receivedData['id'])) {
                    $documentId = $receivedData['id'];
                    $existingData = getAllContent($filePath);
    
                    // Find and update the document
                    foreach ($existingData as &$document) {
                        if ($document['id'] == $documentId) {
                            $document = array_merge($document, $receivedData); // Update fields
                            saveContent($filePath, $existingData);
    
                            echo json_encode(["message" => "Document updated successfully!"]);
                            exit();
                        }
                    }
    
                    http_response_code(404);
                    echo json_encode(["error" => "Document not found"]);
                    exit();
                }
            }
        }
    
        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $input = json_decode(file_get_contents("php://input"), true);
        if (isset($input['id'])) {
            $documentId = $input['id'];
            $content = getAllContent($filePath);

            // Search for the document by id and remove it
            $content = array_filter($content, function($document) use ($documentId) {
                return $document['id'] !== $documentId;
            });

            // Reindex the array so there are no gaps in the array keys
            $content = array_values($content);

            // Save the updated content back to the file
            saveContent($filePath, $content);

            // Respond with success message
            echo json_encode(["message" => "Document deleted successfully"]);
            exit();
        }

        // If 'id' is not provided, return error
        http_response_code(400);
        echo json_encode(["error" => "Document ID is required"]);
        exit();
    }

    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
?>