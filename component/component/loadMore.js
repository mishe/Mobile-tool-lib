module.exports = function (options) { 
	var defaultSetting = { 
		loading: '.loading', 
		padding: 200, 
		url: '', 
		type:'get',
		loadFirstPage: false, 
		hasMore:true,
		data: { 
			pageNo: 1, 
			pageSize: 10 
		},
		success: function () { 
		}, 
		error: null 
	}, 
	opt = $.extend(true, defaultSetting, options), 
	windowHeight = $(window).height(), 
	loading = false, 
	uniqID = $.uniqID(), 
	curPage = opt.data.pageNo; 
	function loadData() { 
		opt.data.pageNo = curPage; 
		var data = { 
			url: opt.url, 
			type: opt.type, 
			contentBox: '', 
			data: opt.data, 
			success: function (d) { 
				var hasMore = true; 
				if (!d || Math.ceil(d.totalCount / (opt.data.pageCount||opt.data.pageSize)) <= curPage+1) {
					$(window).off('scroll.' + uniqID); 
					hasMore = false; 
					opt.hasMore = false;
				} 
				curPage += 1; 
				loading = false; 
				opt.success(d, hasMore); 
			}, 
			error: function (d) { 
				opt.error && opt.error(d); 
				$(window).off('scroll.' + uniqID); 
			}, 
			loading: opt.loading 
		}; 
		$.sync(data); 
	} 
	if (opt.loadFirstPage) { 
		loading = true; 
		loadData(); 
	} 
	$(window).on('scroll.' + uniqID, function () { 
		var offset = document.body.scrollTop; 
		if (offset + windowHeight + opt.padding > fresh.$content.height() && !loading) { 
			loading = true; 
			if(opt.hasMore){
				loadData(); 
			}
		} 
	}); 
	return { 
		destory: function () { 
			$(window).off('scroll.' + uniqID); 
		} 
	}; 
} 