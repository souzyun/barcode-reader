let entryAudio;

function startQrScanner(pavilionName, scannerPage) {
  entryAudio = new Audio(`sounds/${scannerPage.replace(".html", ".mp3")}`);
  entryAudio.preload = "auto";

  const qrScanner = new Html5Qrcode("reader", { facingMode: "user" });
  qrScanner.start(
    { facingMode: "user" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      entryAudio.play().catch((e) => console.log("音声再生エラー", e));
      window.location.href = `view.html?id=${decodedText}&pavilion=${pavilionName}&from=${scannerPage}`;
      qrScanner.stop();
    },
    (error) => {}
  );
}
