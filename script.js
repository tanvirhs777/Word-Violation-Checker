        // List of words to check
        const violatedWords = ['promote', 'healthcare', 'wellness', 'skin-friendly'];

        function checkViolations() {
            // Get the text from textarea
            const text = document.getElementById('inputText').value;
            
            // If no text, show message
            if (text.trim() === '') {
                document.getElementById('result').innerHTML = '<p style="color: #999;">Please paste some text first.</p>';
                return;
            }

            // Start with the original text
            let resultText = text;

            // Check each violated word
            violatedWords.forEach(word => {
                // Create a regular expression to find the word (case insensitive)
                const regex = new RegExp(`\\b${word}\\b`, 'gi');
                
                // Replace the word with underlined version
                resultText = resultText.replace(regex, match => {
                    return `<span class="violated">${match}</span>`;
                });
            });

            // Show the result
            document.getElementById('result').innerHTML = resultText;
        }

        function removeViolatedWords() {
            // Get the text from textarea
            let text = document.getElementById('inputText').value;
            
            // If no text, show message
            if (text.trim() === '') {
                document.getElementById('result').innerHTML = '<p style="color: #999;">Please paste some text first.</p>';
                return;
            }

            // Remove each violated word
            violatedWords.forEach(word => {
                // Create a regular expression to find the word (case insensitive)
                const regex = new RegExp(`\\b${word}\\b`, 'gi');
                
                // Replace the word with empty string
                text = text.replace(regex, '');
            });

            // Clean up multiple spaces but keep line breaks
            text = text.replace(/ +/g, ' ');

            // Show the cleaned text
            document.getElementById('result').innerHTML = text;
        }

        function copyText() {
            // Get the text from result div (without HTML tags)
            const resultDiv = document.getElementById('result');
            const text = resultDiv.innerText;
            
            // If no text, show message
            if (text.trim() === '') {
                alert('No text to copy!');
                return;
            }

            // Copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                // Create notification element
                const notification = document.createElement('div');
                notification.className = 'copy-notification';
                notification.innerHTML = '✓ Copied to Clipboard!';
                document.body.appendChild(notification);

                // Remove notification after animation
                setTimeout(() => {
                    notification.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 1500);
            }).catch(err => {
                alert('Failed to copy text');
            });
        }