const isMobile = () => {
    if ("maxTouchPoints" in navigator) {
        return navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        return navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            return mQ.matches;
        } else {
            return (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(navigator.userAgent) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(navigator.userAgent)
            );
        }
    }
}

export default isMobile;