<script>
  var ctx = document.getElementsByClassName('pie');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Analista', 'Comunicador', 'Planejador', 'Executor"'],
      datasets: [{
        backgroundColor: ['#3e95cd', '#8e5ea2','#3cba9f','#e8c3b9'],
        data: ["50","16","16","16"]
      }]
    }
  });
</script>