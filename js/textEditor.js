function view_text () {
            // Find html elements.
            var textArea = document.getElementById('my_text');
            var div = document.getElementById('view_text');

            // Put the text in a variable so we can manipulate it.

            var text = textArea.value;

             

            // Make sure html and php tags are unusable by disabling < and >.

            text = text.replace(/\</gi, "<");

            text = text.replace(/\>/gi, ">");

            // Exchange newlines for <br />

            text = text.replace(/\n/gi, "<br />");

            // Basic BBCodes.

            text = text.replace(/\[b\]/gi, "<b>");

            text = text.replace(/\[\/b\]/gi, "</b>");

            text = text.replace(/\[i\]/gi, "<i>");

            text = text.replace(/\[\/i\]/gi, "</i>");

            text = text.replace(/\[u\]/gi, "<u>");

            text = text.replace(/\[\/u\]/gi, "</u>");

            // Print the text in the div made for it.

            div.innerHTML = text;

        }

         

        function mod_selection (val1,val2) {

            // Get the text area

            var textArea = document.getElementById('my_text');

             

            // IE specific code.

            if( -1 != navigator.userAgent.indexOf ("MSIE") ) {

                 

                var range = document.selection.createRange();

                var stored_range = range.duplicate();

                 

                if(stored_range.length > 0) {

                    stored_range.moveToElementText(textArea);

                    stored_range.setEndPoint('EndToEnd', range);

                    textArea.selectionStart = stored_range.text.length - range.text.length;

                    textArea.selectionEnd = textArea.selectionStart + range.text.length;

                }

            }

            // Do we even have a selection?

            if (typeof(textArea.selectionStart) != "undefined") {

                // Split the text in three pieces - the selection, and what comes before and after.

                var begin = textArea.value.substr(0, textArea.selectionStart);

                var selection = textArea.value.substr(textArea.selectionStart, textArea.selectionEnd - textArea.selectionStart);

                var end = textArea.value.substr(textArea.selectionEnond);

                // Insert the tags between the three pieces of text.

                textArea.value = begin + val1 + selection + val2 + end;

            }

        }
