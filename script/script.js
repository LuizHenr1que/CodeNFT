document.addEventListener('DOMContentLoaded', function () {
  var counters = document.querySelectorAll('.card-relatorio span');

  counters.forEach(function (counter) {
    var target = parseCountValue(counter.textContent);
    var duration = 1000; // 1 segundo

    var startTime;
    function updateCounter(timestamp) {
      startTime = startTime || timestamp;
      var progress = timestamp - startTime;
      var currentCount = Math.min(
        Math.ceil((progress / duration) * target),
        target,
      );

      // Adiciona o sinal, letra e formatação conforme especificado no HTML
      counter.textContent = formatCountValue(currentCount, target);

      if (progress < duration) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  });

  function parseCountValue(value) {
    return parseFloat(value.replace(/[^\d.]/g, ''));
  }

  function formatCountValue(currentCount, target) {
    if (target >= 1000000) {
      return '+' + Math.round(currentCount / 1000000) + ' M';
    } else if (target >= 1000) {
      return '+' + Math.round(currentCount / 1000) + ' K';
    } else {
      return '' + Math.round(currentCount);
    }
  }
});
