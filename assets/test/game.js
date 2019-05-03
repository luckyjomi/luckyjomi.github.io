$(document).ready(function () {

    var GameArray;
    var WIDTH = 80;//地图宽度
    var HEIGHT = 35;
    var Dir = 3;//设置初始方向
    var Snake = [];
    var Pause=0;
    var SnakeArrayLine = [10, 10];//起始位置
    var FoodsY = 0;
    var FoodsX = 0;
    var Speed = 5//等级1-10；
    var Score = 0
    Snake[0] = SnakeArrayLine;//设置初始长度
    Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);
    Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);
    Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);
    Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);
    Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);
    Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);


    function init() {
        // 生成游戏数组
        GameArray = new Array();
        for (var y = 0; y <= HEIGHT + 1; y++) {
            var GameArray_line = new Array();
            for (var x = 0; x <= WIDTH + 1; x++) {
                if (x == 0 || y == 0 || y == HEIGHT + 1 || x == WIDTH + 1) {
                    GameArray_line[x] = "9";
                } else {
                    GameArray_line[x] = "0";
                }

            }
            GameArray[y] = GameArray_line;
        }
    }
    //用于绘制游戏界面
    function DrawTable() {
        var str = "";
        for (var y = 0; y <= HEIGHT; y++) {
            str += "<tr>";
            for (var x = 0; x <= WIDTH; x++) {
                if (x == 0 || y == 0 || x == WIDTH || y == HEIGHT)
                    str += "<td class='Wall' id='id_" + x + "_" + y + "'>" + "</td>";
                else
                    str += "<td class='View' id='id_" + x + "_" + y + "'>" + "</td>";
            }
            str += "</tr>";
        }
        $("table").html(str);
    }

    //绘制蛇
    function DrawSnake() {
        $(".Snake").removeClass("Snake").addClass("View");
        $(".SnakeHead").removeClass("SnakeHead").addClass("View");
        for (var i = 0; i < Snake.length; i++) {
            var x = Snake[i][0];
            var y = Snake[i][1];
            // alert(i);
            if (i == 0) {
                $("#id_" + x + "_" + y).addClass("SnakeHead");
            } else {
                $("#id_" + x + "_" + y).removeClass("View");
                $("#id_" + x + "_" + y).addClass("Snake");
            }
        }
        // $("#id_" + Snake[0][0] + "_" + Snake[0][1]).removeClass("View");
        // $("#id_" + Snake[0][0] + "_" + Snake[0][1]).addClass("Snake");
        // $("#id_" + Snake[1][0] + "_" + Snake[1][1]).removeClass("View");
        // $("#id_" + Snake[1][0] + "_" + Snake[1][1]).addClass("Snake");

    }

    function ChangeSnake() {
        // 右走


        $(document).keydown(function (e) {
            e.preventDefault();
            if (e.keyCode == 40 && Dir != 1) {
                Dir = 3;
            }
            if (e.keyCode == 37 && Dir != 2) {
                Dir = 4;
            }
            if (e.keyCode == 38 && Dir != 3) {
                Dir = 1;
            }
            if (e.keyCode == 39 && Dir != 4) {
                Dir = 2;
            }

        })
        for (var i = Snake.length - 1; i != 0; i--) {
            Snake[i][0] = Snake[i - 1][0];
            Snake[i][1] = Snake[i - 1][1];
        }

        // Snake[3][0]=Snake[2][0];
        // Snake[3][1]=Snake[2][1];
        // Snake[2][0]=Snake[1][0];
        // Snake[2][1]=Snake[1][1];
        // Snake[1][0]=Snake[0][0];
        // Snake[1][1]=Snake[0][1];

        switch (Dir) {

            case 1:
                Snake[0][1] = parseInt(Snake[0][1]) - 1;
                DrawSnake();
                break;
            case 2:
                Snake[0][0] = parseInt(Snake[0][0]) + 1;
                DrawSnake();
                break;
            case 3:
                Snake[0][1] = parseInt(Snake[0][1]) + 1;
                DrawSnake();
                break;
            case 4:

                Snake[0][0] = parseInt(Snake[0][0]) - 1;
                DrawSnake();
                break;
        }
        // 撞墙了
        if (parseInt(Snake[0][0]) == 0 || parseInt(Snake[0][1]) == 0 || parseInt(Snake[0][0]) == WIDTH || parseInt(Snake[0][1]) == HEIGHT) {
            alert("死亡，游戏结束了");
            clearInterval(time);
        }
        //食物

        if (FoodsX == parseInt(Snake[0][0]) && FoodsY == parseInt(Snake[0][1])) {
            Score += 10;
            DrawFoods();
            Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);
            Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);
            Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);
            Snake.push([parseInt(Snake[Snake.length - 1][0]) + 1, Snake[Snake.length - 1][1]]);
            DrawSnake();
        }
        //咬自己
        for (var ii = 1; ii < Snake.length; ii++) {
            if (Snake[ii][0] == Snake[0][0] && Snake[ii][1] == Snake[0][1]) {
                alert("咬自己了，游戏结束！");
                clearInterval(time);
            }
        }

    }
    //用于生成食物
    function DrawFoods() {
        var min = 1;

        FoodsX = Math.floor(Math.random() * (WIDTH - 1 - min + 1) + min);
        FoodsY = Math.floor(Math.random() * (HEIGHT - 1 - min + 1) + min);
        for (var ii = 1; ii < Snake.length; ii++) {
            if (Snake[ii][0] == FoodsX && Snake[ii][1] == FoodsY) {
                DrawFoods();
            }
        }
        $(".Foods").removeClass("Foods").addClass("View");
        $("#id_" + FoodsX + "_" + FoodsY).removeClass("View");
        $("#id_" + FoodsX + "_" + FoodsY).addClass("Foods");
        $("p").text("食物坐标 x:" + FoodsX + ",y:" + FoodsY + " 分数：" + Score);
    }

    init();
    DrawTable();
    DrawFoods();
    DrawSnake();
    //一直执行
    var time = setInterval(ChangeSnake, 800 / Speed);
    $("button").click(function () {
        if (Pause==0) {
         clearInterval(time);
            Pause=1;
        }
        else {
            time = setInterval(ChangeSnake, 800 / Speed);
            Pause=0;
        }
    });

});