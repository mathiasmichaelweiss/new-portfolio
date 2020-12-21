<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

//Переменная $name,$phone, $mail получает данные при помощи метода POST из формы
$name = $_POST['name'];
$company = $_POST['company'];
$subject = $_POST['subject'];
$email = $_POST['email'];
$message = $_POST['message'];

//в переменную $token нужно вставить токен, который нам прислал @botFather
$token = "1342642839:AAHFlkYv7xB5_sOcgBNpdzOcXSxnyUqs-Z0";

//нужна вставить chat_id (Как получить chad id, читайте ниже)
$chat_id = "175903712";

//Далее создаем переменную, в которую помещаем PHP массив
$arr = array(
    'User name:' => $name,
    'User company:' => $company,
    'Subject:' => $subject,
    'User email:' => $email,
    'Message:' => $message
);

//При помощи цикла перебираем массив и помещаем переменную $txt текст из массива $arr
foreach ($arr as $key => $value) {
    $txt .= "<b>" . $key . "</b> " . $value . "%0A";
};

//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

//Если сообщение отправлено, напишет "Thank you", если нет - "Error"
/* if ($sendToTelegram) {
    echo "Thank you";
} else {
    echo "Error";
} */
