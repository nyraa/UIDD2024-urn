document.addEventListener('DOMContentLoaded', function () {
    var logo = document.getElementById('logo');
    var group = document.getElementById('group');
    var team = document.querySelector('.team');
    var cloud = document.getElementById('cloud');
    var logoAnimated = false;

    function handleScroll() {
        // 检查logo元素是否存在
        if (logo && !logoAnimated && window.scrollY >= window.innerHeight * 0.1) { // 只触发一次动画
            logoAnimated = true; // 设置标志位，表示动画已经触发
            logo.style.top = '17vw'; // 移动到指定位置
            group.style.top = '14vw';
            cloud.style.left = '-50vw';
            team.style.top = '17vw';
        }
    }

    window.addEventListener('scroll', handleScroll);
});
