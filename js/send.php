<?
if((isset($_POST["customer_name"])&&$_POST["customer_name"]!="")&&(isset($_POST["customer_e_mail"])&&$_POST["customer_e_mail"]!="")&&(isset($_POST["customer_message"])&&$_POST["customer_message"]!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
        $to = "oros.roman1@gmail.com"; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = "Portfolio_contact_form"; //Загаловок сообщения
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
                </html>"; //Текст нащего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Sender: <oros.roman@rambler.ru>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}
?>