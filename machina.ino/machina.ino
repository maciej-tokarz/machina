double channel[4];
String result;

void setup() {
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(5, INPUT);
  Serial.begin(9600);
}

void loop() {
  result = "";
  channel[0] = pulseIn(2, HIGH);
  channel[1] = pulseIn(3, HIGH);
  channel[2] = pulseIn(4, HIGH);
  channel[3] = pulseIn(5, HIGH);
  result += "\"throttle\": ";
  result += channel[0];
  result += " \"yaw\": ";
  result += channel[1];
  result += " \"pith\": ";
  result += channel[2];
  result += " \"roll\": ";
  result += channel[3];
  Serial.println(result);
}