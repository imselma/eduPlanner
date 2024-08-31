<?php 

class Security {

    //Validate if the username is an alphanumeric value
    public function validateUsernameAlphanumeric($username){
      
        return ctype_alnum($username);
    }

    //Validate username length (shouldn't be less than 5 characters)
    public function validateUsernameLength($username){
        return mb_strlen($username) < 5;
    }

    //Validate password length (shouldn't be less than 6 characters)
    public function validatePasswordLength($password){
        return mb_strlen($password) < 6;
    }

    //Validate email format
    public function validateEmailFormat($email){
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    //Hawe I Been Pawnd - to check if the passsword is week and has it already been compromised
    public function haveIBeenPawnd($password) {

        //Hash the password
        $sha1Password = strtoupper(sha1($password));

        $prefix = substr($sha1Password, 0, 5); //First five characters
        $suffix = substr($sha1Password, 5); //Rest of hash

        //cURL request to Pwned API
        //To check if the password has been Pwned, I made the request to the Pawnd API and sent the $prefix. 
        $request = curl_init("https://api.pwnedpasswords.com/range/" . $prefix);
        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($request);
        curl_close($request);
    
        if ($response === false) {
            exit('Could not retrieve data from the API.');
        }
    
        $result2 = null;
        if (str_contains($response, $suffix)) {
            $result2 = 0;
        } 
        return $result2;
    }

    //Phone validation
   public function validatePhoneNumber($phoneNumber) {
    $phone_util = \libphonenumber\PhoneNumberUtil::getInstance();
    $result = null;

    try {
        $number_proto = $phone_util->parse($phoneNumber, "BA");
        if ($phone_util->getNumberType($number_proto) ===
            \libphonenumber\PhoneNumberType::MOBILE) {
                $result=1;
        } else {
               $result=0;
        }
        } catch (\libphonenumber\NumberParseException $e) {
            echo $e->getMessage();
        }
        return $result;
  }

}

?>