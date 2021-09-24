var Attack = [
    0,
    10,//[OXX]
    50,//[XX]
    100,//[OXXX]
    400,//[XXX]
    500,//[OXXXX] địch vẫn chặn được
    1000,//[XXXX] có 4 dấu không bị chặn, thêm một nước thắng
    10000//[OXXXXXO],[OXXXXX] ,[XXXXX] nước cuối để thắng
];

var Defense = [
    0,
    5,//[XO]
    25,//[O]
    80,//[XOO]
    200,//[OO]
    300,//[XOO]
    700,//[OOO]
    9999//[OOOO_],[OO_OO],[XOOOO] chặn địch thắng
];