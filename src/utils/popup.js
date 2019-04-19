const PopupManager = {
	zIndex: 2018,
	nextZIndex: function() {
    	return PopupManager.zIndex++;
  	},
}
export default PopupManager;