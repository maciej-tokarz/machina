double channel[4];
double copy[4] = {0, 0, 0, 0};
int checkRange = 6;
boolean isOff[4];
String result;
int count = 0;

void setup()
{
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(5, INPUT);
  Serial.begin(9600);
}

void loop()
{
  result = "";
  channel[0] = pulseIn(2, HIGH);
  channel[1] = pulseIn(3, HIGH);
  channel[2] = pulseIn(4, HIGH);
  channel[3] = pulseIn(5, HIGH);

  if (count = 1000)
  {
    checkController();
    count = 0;
  }

  result += "{\"throttle\": ";
  result += channel[0];
  result += ", \"yaw\": ";
  result += channel[1];
  result += ", \"pith\": ";
  result += channel[2];
  result += ", \"roll\": ";
  result += channel[3];
  result += "}";

  Serial.println(result);
  count++;
}

void checkController()
{
  if (channel[0] > 0 && copy[0] > 0)
  {
    isOff[0] = copy[0] > channel[0] - checkRange && copy[0] < channel[0] + checkRange;
    isOff[1] = copy[1] > channel[1] - checkRange && copy[1] < channel[1] + checkRange;
    isOff[2] = copy[2] > channel[2] - checkRange && copy[2] < channel[2] + checkRange;
    isOff[3] = copy[3] > channel[3] - checkRange && copy[3] < channel[3] + checkRange;
  }

  if (isOff[0] && isOff[1] && isOff[2] && isOff[3])
  {
    channel[0] = 0;
    channel[1] = 0;
    channel[2] = 0;
    channel[3] = 0;
  }
  else
  {
    copy[0] = channel[0];
    copy[1] = channel[1];
    copy[2] = channel[2];
    copy[3] = channel[3];

    isOff[0] = false;
    isOff[1] = false;
    isOff[2] = false;
    isOff[3] = false;
  }
}
