export class UserDto{
	id:             number;
	name:           string;
	Full_Name:      string;
	two_factor:     boolean;
	avatar:         string;
	line_status:    string;
	wins:           number;
	losses:         number;
	ladder_level:   number;
	achievements:   string;
	secret:         string;
  
	email:         string;
	qrCode:        string;
	
	friends:       string[];
	demFriends:   string[];
}
