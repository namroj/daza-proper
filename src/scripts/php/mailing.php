<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $first_name = $_POST["first_name"];
  $last_name = $_POST["last_name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  $message = $_POST["message"];

  $body = "Nombre: $first_name $last_name\n";
  $body .= "Email: $email\n";
  $body .= "Teléfono: $phone\n";
  $body .= "Consulta: $message\n";

  $to = "luciano.cicchino@gmail.com";
  $subject = "[DAZA Real Estate] Proper - Consulta <$email>";
  $headers = "From: info@dazarealestate.com\r\nReply-To: $email\r\n";

  if (mail($to, $subject, $body, $headers)) {
    $response = [
      "status" => "OK",
      "msg" => "Consulta enviada con éxito"
    ];
  } else {
    $response = [
      "status" => "Error",
      "msg" => "Ocurrió un error en el envío del mensaje. Por favor intente nuevamente"
    ];
  }

  header("Content-type: application/json");
  echo json_encode($response);
} else {
  header("HTTP/1.1 400 Bad Request");
  echo "Ocurrió un error en el envío del mensaje. Por favor intente nuevamente";
}
