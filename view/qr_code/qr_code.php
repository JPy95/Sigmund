<!doctype html>
<html lang="pt-br">
  <?php include_once('../head/head.php')?>
  <link rel="stylesheet" href="../qr_code/style/qr_code.css">
  <body>
    
    <?php include_once('../navbar/navbar.php')?>
    <!-- Optional JavaScript -->
    <div class="qrCode-painel container col-12 mt-5">
      <div id="qrCodeWeb" class=" col-6">
        <?php
          $aux = 'php/qr_img.php?';
          $aux .= 'd=http://sigmund2.dx.am?idProjeto='.$_GET['projeto'].'&';
          $aux .= 'e=H&';
          $aux .= 's=10&';
          $aux .= 't=J';
        ?>
        <img src="<?php echo $aux?>" class="qrCode-img">
      </div>
      <div class="col-sm-6 mt-3">
        <h3></h3>
        <div class="qrCode-mobile-gif mt-4">
          <img src="../qr_code/gif/2.gif" class='qrCode-gif' width="65%">
          <div id="qrCodeMobile" class=" col-6">
            <?php
              $aux = 'php/qr_img.php?';
              $aux .= 'd=http://localhost/Sigmund/view/quiz/quiz.html?idProjeto=12&';
              $aux .= 'e=H&';
              $aux .= 's=10&';
              $aux .= 't=J';
            ?>
            <img src="<?php echo $aux?>" class="qrCode-img">
          </div>
        </div>
        <div class="resumoQrcode mt-4">
          <span>Restam responder </span><label id="aluno"></label><span> alunos.</span><br>
          <span style="font-size: 20px;margin-right: 10px;">Código do Projeto: </span><label style="font-size: 20px;font-weight: 700;color: black;"><?php echo $_GET['projeto']?></label><br>
          <span style="font-size: 20px;margin-right: 10px;">Acesse o Quiz com: </span>
          <label style="font-size: 20px;font-weight: 700;color: black;">bit.do/TribusQuiz</label>
        </div>
      </div>
    </div>
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
    <script type='text/javascript' src='qr_code.js'></script>
  </body>
</html>