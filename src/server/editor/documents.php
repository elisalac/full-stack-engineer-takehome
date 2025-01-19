<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $filePath = "data.json";

    // Function to get all content from the file
    function getAllContent(string $filePath): array {
        return file_exists($filePath) ? json_decode(file_get_contents($filePath), true) ?? [] : [];
    }

    // Function to save content to the file
    function saveContent(string $filePath, array $data): void {
        file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
    }

    // Handle GET request for fetching all content
    if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['get_all'])) {
        echo json_encode(getAllContent($filePath));
        exit();
    }

    // Handle POST request for creating a new document
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (isset($data['name'])) {
            $content = getAllContent($filePath);
            $newDocument = [
                "id" => strval(count($content)),
                "name" => $data['name'],
                "data" => ["ops" => []]
            ];
            
            $content[] = $newDocument;
            saveContent($filePath, $content);

            echo json_encode($newDocument);
            exit();
        }

        http_response_code(400);
        echo json_encode(["error" => "Name is required"]);
        exit();
    }

    // Handle PUT request for updating an existing document
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $receivedData = json_decode(file_get_contents("php://input"), true);

        if ($receivedData && isset($receivedData['id'])) {
            $documentId = $receivedData['id'];
            $existingData = getAllContent($filePath);

            foreach ($existingData as &$document) {
                if ($document['id'] == $documentId) {
                    $document = array_merge($document, $receivedData);
                    saveContent($filePath, $existingData);

                    echo json_encode(["message" => "Document updated successfully!"]);
                    exit();
                }
            }

            http_response_code(404);
            echo json_encode(["error" => "Document not found"]);
            exit();
        }

        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
        exit();
    }

    // Handle DELETE request for deleting a document
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $input = json_decode(file_get_contents("php://input"), true);

        if (isset($input['id'])) {
            $documentId = $input['id'];
            $content = getAllContent($filePath);

            $content = array_filter($content, fn($document) => $document['id'] !== $documentId);
            $content = array_values($content);

            saveContent($filePath, $content);

            echo json_encode(["message" => "Document deleted successfully"]);
            exit();
        }

        http_response_code(400);
        echo json_encode(["error" => "Document ID is required"]);
        exit();
    }

    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
?>