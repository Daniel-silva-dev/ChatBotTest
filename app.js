const inputQuestion = document.querySelector('#inputQuestion');
const result = document.querySelector('#result');

const API_KEY = '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'

inputQuestion.addEventListener('keypress', (e) => {
    if (inputQuestion.value && e.key === 'Enter')
    sendQuestion();
});

function sendQuestion() {
    var sQuestion = inputQuestion.value;

    fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-Type': 'application/json',
        Authorization: 'Bearer ' + API_KEY,
    },
    body: JSON.stringify({
        model:'text-davinci-003',
        prompt: sQuestion,
        max_tokens: 2084, //Tamanho da resposta
        temperature: 0.5, //Criatividade da resposta
    }),
    })
        .then((response) => response.json())
        .then((json) => {
            if (result.value) result.value += "\n";
      
            if (json.error?.message) {
              result.value += `Error: ${json.error.message}`;
            } else if (json.choices?.[0].text) {
              var text = json.choices[0].text || "Sem resposta";
      
              result.value += "Chat GPT: " + text;
            }
      
            result.scrollTop = result.scrollHeight;
          })
          .catch((error) => console.error("Error:", error))
          .finally(() => {
            inputQuestion.value = "";
            inputQuestion.disabled = false;
            inputQuestion.focus();
          });

    if (result.value) result.value += '\n\n\n';

    result.value += `Eu: ${sQuestion}`;
    inputQuestion.value = 'Carregando...';
    inputQuestion.disabled = true;

    result.scrollTop = result.scrollHeight;
};
