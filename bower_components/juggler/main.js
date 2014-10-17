requirejs.config({
    paths: {
        jquery: 'jquery-1.9.1.min'
    }
});

requirejs(['jquery', 'Ball', 'Hand'], function ($, Ball, Hand) {
    var balls = [],
        handLeft,
        handRight,
        sceneWidth = $('#scene').width() - 50,
        tickInc = 50;

    handLeft = new Hand($('#hand-left'), {
        pos: {
            origin: 'left',
            min: 0,
            inc: 50,
            max: 100
        },
        keys: {
            moveTo: 115,
            moveFrom: 102
        }
    });

    handRight = new Hand($('#hand-right'), {
        pos: {
            origin: 'right',
            min: 0,
            inc: 50,
            max: 100
        },
        keys: {
            moveTo: 108,
            moveFrom: 106
        }
    });

    $(function () {
        $(document).keyup(function () {
            if (event.which !== 32) {
                return;
            }

            event.preventDefault = true;

            balls = [];
            
            balls.push(new Ball($('#ball-outer'), {
                left: '0px',
                right: '300px',
                base: '50px',
                apex: '550px',
                tick: 1000 + tickInc / 90,
                duration: 5,
                delay: 0
            }));

            balls.push(new Ball($('#ball-middle'), {
                left: '50px',
                right: '250px',
                base: '50px',
                apex: '370px',
                tick: 1000 + tickInc / 180,
                duration: 4,
                delay: 333
            }));

            balls.push(new Ball($('#ball-inner'), {
                left: '100px',
                right: '200px',
                base: '50px',
                apex: '230px',
                tick: 1000,
                duration: 3,
                delay: 667
            }));

            $('#press-space').remove();

            $.each(balls, function (index, ball) {
                setTimeout(function (event) {
                    juggleBallToRight.call(ball);
                }, ball.delay);
            });
        });
    });

    function juggleBallToLeft() {
        this
            .juggleToLeft()
            .then(catchOnLeft)
            .done(incrementScore)
            .done(juggleBallToRight)
            .fail(gameOver);
    }

    function juggleBallToRight() {
        this
            .juggleToRight()
            .then(catchOnRight)
            .done(incrementScore)
            .done(juggleBallToLeft)
            .fail(gameOver);
    }

    function catchOnLeft(pos) {
        if (handLeft.pos === pos) {
            return $.Deferred().resolveWith(this).promise();
        } else {
            return $.Deferred().rejectWith(this).promise();
        }
    }

    function catchOnRight(pos) {
        if (sceneWidth - handRight.pos === pos) {
            return $.Deferred().resolveWith(this).promise();
        } else {
            return $.Deferred().rejectWith(this).promise();
        }
    }

    function incrementScore() {
        var score = parseInt($('#counter').text());

        if (score % 94 === 93) {
            $.each(balls, function (index, ball) {
                ball.tick -= tickInc;
            });
        }

        $('#counter').text(score + 1);
    }

    function gameOver() {
        $.each(balls, function (index, ball) {
            ball.$el.stop();
        });

        $('#game-over').show();
    }
});
