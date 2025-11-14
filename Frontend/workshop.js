document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'images/paygap.pdf'; // path to your PDF
    link.target = '_blank';          // OPEN IN NEW TAB
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
