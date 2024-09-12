<?php
use Orhanerday\OpenAi\OpenAi;

class ResponseService {

    public function generateResponse($data) {
        
        if (!isset($data['prompt'])) {
            // Return an error if 'prompt' is not provided in the input data
            return json_encode(['error' => 'Missing prompt in the request data']);
        }


            $prompt = $data['prompt'];
            $open_ai_key = OPENAI_API_KEY;
            $open_ai = new OpenAi($open_ai_key);
            
            // Make the API call to OpenAI
            $complete = $open_ai->completion([
                'model' => 'gpt-3.5-turbo-instruct',
                'prompt' => $prompt,
                'temperature' => 0.9,
                'max_tokens' => 150,
                'frequency_penalty' => 0,
                'presence_penalty' => 0.6,
            ]);
            
            if ($complete) {
                $php_obj = json_decode($complete);
                if (isset($php_obj->choices[0]->text)) {
                    // Return the AI-generated text
                    return $php_obj->choices[0]->text;
                }
            }
            // If something went wrong
            return "No valid response from the OpenAI API.";
        }
    }

?>