<?
    if((isset($_POST["customer_name"])&&$_POST["customer_name"]!="")&&(isset($_POST["customer_e_mail"])&&$_POST["customer_e_mail"]!="")&&(isset($_POST["customer_message"])&&$_POST["customer_message"]!="")){
            $to = "oros.roman1@gmail.com";
            $subject = "Portfolio_contact_form";
            $message = "
                    <html>
                        <head>
                            <title>'.$subject.'</title>
                        </head>
                        <body>
                            <p>Name: ".$_POST["customer_name"]."</p><br>
                            <p>E-mail: ".$_POST["customer_e_mail"]."</p><br>
                            <p>Message: ".$_POST["customer_message"]."</p>                      
                        </body>
                    </html>";
            $headers  = "Content-type: text/html; charset=utf-8 \r\n";
            $headers .= "From: Sender: <oros.roman@rambler.ru>\r\n";
            mail($to, $subject, $message, $headers);
        }
?>