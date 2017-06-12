<?php
$score = $_GET['score'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
     <link rel="stylesheet" href="css/styleDone.css" type="text/css">
    <script type="text/javascript" src="js/main.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Bangers' rel='stylesheet' type='text/css'>
</head>
<body>

<div class="score">
    <h1>Score</h1>
    <p><?=$score?></p>
</div>

<a href="dist/index.html" class="replay"><img src="images/replay%20button.png"></a>
<a href="menu.html" class="home"><img src="images/home.png"></a>
<a href="leaderboardsScore.php" class="lb"><img src="images/leaderboards%20button.png"></a>
<a href="send.php?score=<?=$score?>" class="send"><img src="images/sendbutton.png"></a>

</body>
</html>
