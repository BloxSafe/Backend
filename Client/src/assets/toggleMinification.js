function toggleMinification() {
  console.log(`Toggle: ${localStorage.minify_on_obfuscate}`);
  if (
    localStorage.minify_on_obfuscate == true ||
    localStorage.minify_on_obfuscate == "true"
  ) {
    localStorage.setItem("minify_on_obfuscate", false);
  } else {
    localStorage.setItem("minify_on_obfuscate", true);
  }
}

export default toggleMinification;
