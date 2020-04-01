<?php
    $result = explode(",", $_POST['result']);
    
    $result = array_count_values($result);

    $result[1] = $result[1]*4;
    $result[2] = $result[2]*4;
    $result[3] = $result[3]*4;
    $result[4] = $result[4]*4;
    $perfil = array_search(max($result), $result);

    echo $perfil;
?>