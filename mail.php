<?php
  header("Access-Control-Allow-Headers: X-Requested-With");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

  $json = json_decode(file_get_contents("php://input"));

  $subject = $json->subject;
  $from = $json->mail;
  $email = "Bericht van " . $from . "\r\n\r\n";
  $email .= $json->message;
  $to = "owain@owain.nl";

  ini_set("sendmail_from", $from);

  $headers   = array();
  $headers[] = "MIME-Version: 1.0";
  $headers[] = "Content-type: text/plain; charset=iso-8859-1";
  $headers[] = "From: mail@owain.nl <mail@owain.nl>";
  $headers[] = "Reply-To: {$from}";
  if ($json->copy) {
    $headers[] = "Cc: $json->mail";
  }
  $headers[] = "X-Mailer: PHP/" . phpversion();

  mail($to, $subject, $email, implode("\r\n", $headers) );

  echo json_encode(file_get_contents("php://input"));
