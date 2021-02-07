import Vue from 'vue';
// #ifdef H5 
//banner图
const banners =  '/api/banner';
//登录
//手机登陆
const phoneLogin = '/api/login/cellphone';
//邮箱登陆
const emailLogin = '/api/login';
//刷新登录
const refreshLogin = '/api/login/refresh';
//发送验证码
const captchaSent = '/api/captcha/sent';
//验证验证码
const captchaVerify = '/api/captcha/verify';
//注册(修改密码)
const registerCellphone = '/api/register/cellphone';
//检测手机号码是否已注册
const cellphoneCheck = '/api/cellphone/existence/check';
//初始化昵称
const activateProfile = '/api/activate/init/profile';
//更换绑定手机
const rebind =  '/api/rebind';
//获取动态消息
const _event = '/api/event';
//歌手分类列表
const _artistList = '/api/artist/list';
//收藏歌手
const _artistSub = '/api/artist/sub';
//取消收藏歌手
const _artistUnsub = '/api/artist/unsub';
//收藏的歌手列表
const _artistSublist = '/api/artist/sublist';
//歌单分类
const _playlistCatlist = '/api/playlist/catlist';
//热门歌单分类
const _playlistHot = '/api/playlist/hot';
//歌单(网友精选碟)
const _topPlaylsit = '/api/top/playlist';
//获取精品歌单
const _topPlaylistHighquality = '/api/top/playlist/highquality';
// 获取歌单详情
const _playlistDetail = '/api/playlist/detail';
// 获取音乐 url
const _musicUrl = '/api/song/url';
//音乐是否可用
const _checkMusic = '/api/check/music';
// 搜索
const _secrch = '/api/search';
//热搜
const _secrchHot = '/api/search/hot';
//搜索建议
const _searchSuggest = '/api/search/suggest';
//搜索多重匹配
const _searchMultimatch = '/api/search/multimatch';
//新建歌单
const _playlistCreate = '/api/playlist/create';
//收藏 / 取消收藏歌单
const _playlistSubscribe = '/api/playlist/subscribe';
//获取歌词
const _lyric = '/api/lyric';
//歌曲评论
const _commentMusic = '/api/comment/music';
//专辑评论
const _commentAlbum = '/api/comment/album';
//歌单评论
const _commentPlaylist = '/api/comment/playlist';
//mv 评论
const _commentMv = '/api/comment/mv';
//电台节目评论
const _commentDj = '/api/comment/dj';
// 获取歌曲详情
const _songDetail = '/api/song/detail';
// 获取专辑内容
const _album = '/api/album';
// 获取歌手单曲
const _artists = '/api/artists';
//获取歌手 mv
const _artistsMv = '/api/artist/mv';
// 获取歌手专辑
const _artistAlbum = '/api/artist/album';
//获取歌手描述
const _artistDesc = '/api/artist/desc';
//获取相似歌手
const _simiArtist = '/api/simi/artist';
//获取相似歌单
const _simiPlaylist = '/api/simi/playlist';
//相似 mv
const _simiMv = '/api/simi/mv';
//获取相似音乐
const _simiSong = '/api/simi/song';
//获取最近 5 个听了这首歌的用户
const _simiUser = '/api/simi/user';
// 喜欢音乐
const _like = '/api/like';
//垃圾桶
const _fmTrash = '/api/fm_trash';
//新碟上架
const _topAlbum = '/api/top/album';
// 热门歌手
const _topArtists = '/api/top/artists';
//最新 mv
const _mvFirst = '/api/mv/first';
//推荐 mv
const _personalizedMv = '/api/personalized/mv';
// 推荐歌单
const _personalized = '/api/personalized';
//推荐新音乐
const _personalizedNewsong = '/api/personalized/newsong';
//推荐电台
const _presonalizedDjprogram = '/api/personalized/djprogram';
//推荐节目
const _programRecommend = '/api/program/recommend';
// 独家放送
const _personalizedPrivatecontent = '/api/personalized/privatecontent';
// mv 排行
const _topMv = '/apitop/mv';
// 获取 mv 数据
const _mv = '/api/mv';
// 播放 mv
const _mvUrl = '/api/mv/url';
//排行榜
const _topList = '/api/topList';
//所有榜单
const _toplistAll = '/api/toplist';
//所有榜单内容摘要
const _toplistDetail = '/api/toplist/detail';
// 歌手榜
const _toplistArtist = '/api/toplist/artist';
//获取用户详情
const _userDetail   = '/api/user/detail';
//获取用户信息, 歌单，收藏，mv, dj 数量
const _userSubcount = '/api/user/subcount';
//获取用户歌单
const _userPlaylist = '/api/user/playlist';
//更新歌单
const _playlistUpdate = '/api/playlist/update';
//发送私信
const _sendText = '/api/send/text';
//发送私信(带歌单)
const _sendPlaylist = '/api/send/playlist';
//获取用户电台
const _userDj = '/api/user/dj';
//获取用户关注列表
const _userFollows = '/api/user/follows';
//获取用户粉丝列表
const _userfolloweds = '/api/user/followeds';
//获取用户动态
const _userEvent = '/api/user/event';
//获取用户播放记录
const _userRecord = '/api/user/record';
// 对歌单添加或删除歌曲
const _playlistTracks = '/api/playlist/tracks';
// 给评论点赞
const _commentLike = '/api/comment/like';
//获取每日推荐歌单
const _recommendResource = '/api/recommend/resource';
// 获取每日推荐歌曲
const _recommendSongs = '/api/recommend/songs';
// 私人 FM
const _personalFm = '/api/personal_fm';
// 签到
const _dailySignin = '/api/daily_signin';
// 云盘
const _userCloud = '/api/user/cloud';
//电台 - 推荐
const _djRecommend = '/api/dj/recommend';
// 电台 - 分类
const _djCatelist = '/api/dj/catelist';
// 电台 - 分类推荐
const _djRecommendType = '/api/dj/recommend/type';
// 电台 - 订阅
const _djSub = '/api/dj/sub';
// 电台的订阅列表
const _djSublist = '/api/dj/sublist';
// 电台 - 详情
const _djDetail = '/api/dj/detail';
// 电台 - 节目
const _djProgram = '/api/dj/program';
//电台 - 付费精选
const _djPaygift = '/api/dj/paygift';
//退出登录
const _logout = '/api/logout';

//登录状态
const _loginStatus = '/api/login/status';
//获取帐号信息
const _userAccount = '/api/user/account';
//获取用户等级信息
const _userLevel = "/api/user/level";
//获取用户绑定信息
const _userBinding = "/api/user/binding";
//用户绑定手机
const _userReplacephone = "/api/user/replacephone";
//更新用户信息
const _userUpdate = "/api/user/update";
//更新头像
const _avatarUpload = "/api/avatar/upload";
//国家编码列表
const _countriesCode = "/api/countries/code/list";
//更新歌单描述
const _playlistDeseUpdate = "/api/playlist/desc/update";
//更新歌单名
const _playlistNameUpdate = "/api/playlist/name/update";
//更新歌单标签
const _playlistTagsUpdate = "/api/playlist/tags/update";
//歌单封面上传
const _playlistCoverUpdate = "/api/playlist/cover/update";
//调整歌单顺序
const _playlistOrderUpdate = "/api/playlist/order/update";
//调整歌曲顺序
const _songOrderUpdate = "/api/song/order/update";
//转发用户动态
const _eventForward = "/api/event/forward";
//删除用户动态
const _eventDel = "/api/event/del";
//分享歌曲、歌单、mv、电台、电台节目到动态
const _shareResource = "/api/share/resource";
//获取动态评论
const _commentEvent = "/api/comment/event";
//关注/取消关注用户
const _follow = "/api/follow";
//获取热门话题
const _hotTopic = "/api/hot/topic";
//云村热评
const _commentHotwall = "/api/comment/hotwall/list";
//心动模式/智能播放
const _playmodeIntelligence = "/api/playmode/intelligence/list";
//歌手热门50首歌曲
const _artistTopSong = "/api/artist/top/song";
//歌手全部歌曲
const _artistSongs = "/api/artist/songs";
//收藏的专栏
const _topicSublist = "/api/topic/sublist";
//收藏视频
const _videoSub = "/api/video/sub";
//收藏/取消收藏 MV
const _mvSub = "/api/mv/sub";
//收藏的 MV 列表
const _mvSublist = "/api/mv/sublist";
//精品歌单标签列表
const _playlistHighqualityTags = "/api/playlist/highquality/tags";
//相关歌单推荐
const _relatedPlaylist = "/api/related/playlist";
//默认搜索关键词
const _searchDefault = "/api/search/default";
//热搜列表(详细)
const _searchHotDetail = "/api/search/hot/detail";
//删除歌单
const _playlistDelete = "/api/playlist/delete";
//歌单收藏者
const _playlistSubscribers = "/api/playlist/subscribers";
//收藏视频到视频歌单
const _playlistTrackAdd = "/api/playlist/track/add";
//删除视频歌单里的视频
const _playlistTrackDelete = "/api/playlist/track/delete";
//最近播放的视频
const _playlistVideoRecent = "/api/playlist/video/recent";
//新歌速递
const _topSong = "/api/top/song";
//首页-发现
const _homepageBlockpage = "/api/homepage/block/page";
//首页-发现-圆形图标入口列表
const _homepageDragonball = "/api/homepage/dragon/ball";
//楼层评论
const _commentFloor = "/api/comment/floor";
//视频评论
const _commentVideo = "/api/comment/video";
//热门评论
const _commentHot = "/api/comment/hot";
//新版评论接口
const _commentNew = "/api/comment/new";
//抱一抱评论
const _hugComment = "/api//hug/comment";
//评论抱一抱列表
const _commentHuglist = "/api/comment/hug/list";
//发送/删除评论
const _comment = "/api/comment";
//资源点赞( MV,电台,视频)
const _resourceLike = "/api/resource/like";
//获取点赞过的视频
const _playlistMylike = "/api/playlist/mylike";
//专辑动态信息
const _albumDetailDynamic = "/api/album/detail/dynamic";
//收藏/取消收藏专辑
const _albumSub = "/api/album/sub";
//获取已收藏专辑列表
const _albumSublist = "/api/album/sublist";
//获取歌手详情
const _artistDetail = "/api/artist/detail";
//获取历史日推可用日期列表
const _historyRecommendSongs = "/api/history/recommend/songs";
//获取历史日推详情数据
const _historyRecommendSongsDetail = "/api/history/recommend/songs/detail";
//喜欢音乐列表
const _likelist = "/api/likelist";
//全部新碟
const _albumNew = "/api/album/new";
//最新专辑
const _albumNewest = "/api/album/newest";
//听歌打卡
const _scrobble = "/api/scrobble";
//全部 mv
const _mvAll = "/api/mv/all";
//网易出品mv
const _mvExclusiveRcmd = "/api/mv/exclusive/rcmd";
//独家放送列表
const _personalizedPrivatecontentList = "/api/personalized/privatecontent/list";
//获取 mv 点赞转发评论数数据
const _mvDetailinfo = "/api/mv/detail/info";
//获取视频标签列表
const _videoGrouplist = "/api/video/group/list";
//获取视频分类列表
const _videCategorylist = "/api/video/category/list";
//获取视频标签/分类下的视频
const _videoGroup = "/api/video/group";
//获取全部视频列表
const _videoTimelineAll = "/api/video/timeline/all";
//相关视频
const _relatedAllvideo = "/api/related/allvideo";
//视频详情
const _videoDetail = "/api/video/detail";
//获取视频点赞转发评论数数据
const _videoDetailinfo = "/api/video/detail/info";
//获取视频播放地址
const _videoUrl = "/api/video/url";
//云盘数据详情
const _userClouddetail = "/api/user/cloud/detail";
//云盘歌曲删除
const _userClouddel = "/api/user/cloud/del";
//电台banner
const _djBanner = "/api/dj/banner";
//电台个性推荐
const _djPersonalizeRecommend = "/api/dj/personalize/recommend";
//电台订阅者列表
const _djSubscriber = "/api/dj/subscriber";
//用户电台
const _userAudio = "/api/user/audio";
//热门电台
const _djHot = "/api/dj/hot";
//电台 - 节目榜
const _djProgramToplist = "/api/dj/program/toplist";
//电台 - 付费精品
const _djToplistPay = "/api/dj/toplist/pay";
//电台 - 24小时节目榜
const _djProgramtoplistHours = "/api/dj/program/toplist/hours";
//电台 - 主播新人榜
const _djToplistNewcomer = "/api/dj/toplist/newcomer";
//电台 - 最热主播榜
const _djToplistPopular = "/api/dj/toplist/popular";
//电台 - 新晋电台榜/热门电台榜
const _djToplist = "/api/dj/toplist";
//电台 - 类别热门电台
const _djRadioHot = "/api/dj/radio/hot";
//电台 - 非热门类型
const _djCategoryexcludehot = "/api/dj/category/excludehot";
//电台 - 推荐类型
const _djCategoryRecommend = "/api/dj/category/recommend"
//电台 - 今日优选
const _djTodayPerfered = "/api/dj/today/perfered";
//电台 - 节目详情
const _djProgramDetail = "/api/dj/program/detail";
//通知 - 私信
const _msgPrivate = "/api/msg/private";
//发送私信音乐
const _sendSong = "/api/send/song";
//最近联系人
const _msgRecentContact = "/api/msg/recentcontact";
//私信内容
const _msgPrivateHistory = "/api/msg/private/history";
//通知 - 评论
const _msgComments = "/api/msg/comments";
//通知 - @我
const _msgForwards = "/api/msg/forwards";
//通知 - 通知
const _msgNotices = "/api/msg/notices";
//设置
const _setting = "/api/setting";
//数字专辑-新碟上架
const _albumList = "/api/album/list";
//数字专辑&数字单曲-榜单
const _album_songsaleboard = "/api/album_songsaleboard";
//数字专辑-语种风格馆
const _albumListStyle = "/api/album/list/style";
//数字专辑详情
const _albumDetail = "/api/album/detail";
//我的数字专辑
const _digitalAlbumpurchased = "/api/digitalAlbum/purchased";
//购买数字专辑
const _digitalAlbumordering = "/api/digitalAlbum/ordering";
//音乐日历
const _calendar = "/api/calendar";
//云贝
const _yunbei = "/api/yunbei";
//云贝今日签到信息
const _yunbeiToday = "/api/yunbei/today";
//云贝签到
const _yunbeiSign = "/api/yunbei/sign";
//云贝账户信息
const _yunbeiInfo = "/api/yunbei/info";
//云贝所有任务
const _yunbeiTasks = "/api/yunbei/tasks";
//云贝todo任务
const _yunbeiTaskstodo = "/api/yunbei/tasks/todo";
//云贝完成任务
const _yunbeiTaskfinish = "/api/yunbei/task/finish";
//云贝收入
const _yunbeiTasksreceipt = "/api/yunbei/tasks/receipt";
//云贝支出
const _yunbeiTasksexpense = "/api/yunbei/tasks/expense";
//关注歌手新歌
const _artistNewsong = "/api/artist/new/song";
//关注歌手新MV
const _artistNewmv = "/api/artist/new/mv";
//batch批量请求接口
const _batch = "/api/batch";
// #endif 
// #ifndef H5
//banner图
const banners = '/banner';
//登录
//手机登陆
const phoneLogin = '/login/cellphone';
//邮箱登陆
const emailLogin = '/login';
//刷新登录
const refreshLogin = '/login/refresh';
//发送验证码
const captchaSent = '/captcha/sent';
//验证验证码
const captchaVerify = '/captcha/verify';
//注册(修改密码)
const registerCellphone = '/register/cellphone';
//检测手机号码是否已注册
const cellphoneCheck = '/cellphone/existence/check';
//初始化昵称
const activateProfile = '/activate/init/profile';
//更换绑定手机
const rebind =  '/rebind';
//获取动态消息
const _event = '/event';
//歌手分类列表
const _artistList = '/artist/list';
//收藏歌手
const _artistSub = '/artist/sub';
//取消收藏歌手
const _artistUnsub = '/artist/unsub';
//收藏的歌手列表
const _artistSublist = '/artist/sublist';
//歌单分类
const _playlistCatlist = '/playlist/catlist';
//热门歌单分类
const _playlistHot = '/playlist/hot';
//歌单(网友精选碟)
const _topPlaylsit = '/top/playlist';
//获取精品歌单
const _topPlaylistHighquality = '/top/playlist/highquality';
// 获取歌单详情
const _playlistDetail = '/playlist/detail';
// 获取音乐 url
const _musicUrl = '/song/url';
//音乐是否可用
const _checkMusic = '/check/music';
// 搜索
const _secrch = '/search';
//热搜
const _secrchHot = '/search/hot';
//搜索建议
const _searchSuggest = '/search/suggest';
//搜索多重匹配
const _searchMultimatch = '/search/multimatch';
//新建歌单
const _playlistCreate = '/playlist/create';
//收藏 / 取消收藏歌单
const _playlistSubscribe = '/playlist/subscribe';
//获取歌词
const _lyric = '/lyric';
//歌曲评论
const _commentMusic = '/comment/music';
//专辑评论
const _commentAlbum = '/comment/album';
//歌单评论
const _commentPlaylist = '/comment/playlist';
//mv 评论
const _commentMv = '/comment/mv';
//电台节目评论
const _commentDj = '/comment/dj';
// 获取歌曲详情
const _songDetail = '/song/detail';
// 获取专辑内容
const _album = '/album';
// 获取歌手单曲
const _artists = '/artists';
//获取歌手 mv
const _artistsMv = '/artist/mv';
// 获取歌手专辑
const _artistAlbum = '/artist/album';
//获取歌手描述
const _artistDesc = '/artist/desc';
//获取相似歌手
const _simiArtist = '/simi/artist';
//获取相似歌单
const _simiPlaylist = '/simi/playlist';
//相似 mv
const _simiMv = '/simi/mv';
//获取相似音乐
const _simiSong = '/simi/song';
//获取最近 5 个听了这首歌的用户
const _simiUser = '/simi/user';
// 喜欢音乐
const _like = '/like';
//垃圾桶
const _fmTrash = '/fm_trash';
//新碟上架
const _topAlbum = '/top/album';
// 热门歌手
const _topArtists = '/top/artists';
//最新 mv
const _mvFirst = '/mv/first';
//推荐 mv
const _personalizedMv = '/personalized/mv';
// 推荐歌单
const _personalized = '/personalized';
//推荐新音乐
const _personalizedNewsong = '/personalized/newsong';
//推荐电台
const _presonalizedDjprogram = '/personalized/djprogram';
//推荐节目
const _programRecommend = '/program/recommend';
// 独家放送(入口列表)
const _personalizedPrivatecontent = '/personalized/privatecontent';
// mv 排行
const _topMv = '/top/mv';
// 获取 mv 数据
const _mv = '/mv';
// 播放 mv
const _mvUrl = '/mv/url';
//排行榜
const _topList = '/topList';
//所有榜单
const _toplistAll = '/toplist';
//所有榜单内容摘要
const _toplistDetail = '/toplist/detail';
// 歌手榜
const _toplistArtist = '/toplist/artist';
//获取用户详情
const _userDetail   = '/user/detail';
//获取用户信息, 歌单，收藏，mv, dj 数量
const _userSubcount = '/user/subcount';
//获取用户歌单
const _userPlaylist = '/user/playlist';
//更新歌单
const _playlistUpdate = '/playlist/update';
//发送私信
const _sendText = '/send/text';
//发送私信(带歌单)
const _sendPlaylist = '/send/playlist';
//获取用户电台
const _userDj = '/user/dj';
//获取用户关注列表
const _userFollows = '/user/follows';
//获取用户粉丝列表
const _userfolloweds = '/user/followeds';
//获取用户动态
const _userEvent = '/user/event';
//获取用户播放记录
const _userRecord = '/user/record';
// 对歌单添加或删除歌曲
const _playlistTracks = '/playlist/tracks';
// 给评论点赞
const _commentLike = '/comment/like';
//获取每日推荐歌单
const _recommendResource = '/recommend/resource';
// 获取每日推荐歌曲
const _recommendSongs = '/recommend/songs';
// 私人 FM
const _personalFm = '/personal_fm';
// 签到
const _dailySignin = '/daily_signin';
// 云盘
const _userCloud = '/user/cloud';
//电台 - 推荐
const _djRecommend = '/dj/recommend';
// 电台 - 分类
const _djCatelist = '/dj/catelist';
// 电台 - 分类推荐
const _djRecommendType = '/dj/recommend/type';
// 电台 - 订阅
const _djSub = '/dj/sub';
// 电台的订阅列表
const _djSublist = '/dj/sublist';
// 电台 - 详情
const _djDetail = '/dj/detail';
// 电台 - 节目
const _djProgram = '/dj/program';
//电台 - 付费精选
const _djPaygift = '/dj/paygift';
//退出登录
const _logout = '/logout'

//登录状态
const _loginStatus = '/login/status';
//获取帐号信息
const _userAccount = '/user/account';
//获取用户等级信息
const _userLevel = "/user/level";
//获取用户绑定信息
const _userBinding = "/user/binding";
//用户绑定手机
const _userReplacephone = "/user/replacephone";
//更新用户信息
const _userUpdate = "/user/update";
//更新头像
const _avatarUpload = "/avatar/upload";
//国家编码列表
const _countriesCode = "/countries/code/list";
//更新歌单描述
const _playlistDeseUpdate = "/playlist/desc/update";
//更新歌单名
const _playlistNameUpdate = "/playlist/name/update";
//更新歌单标签
const _playlistTagsUpdate = "/playlist/tags/update";
//歌单封面上传
const _playlistCoverUpdate = "/playlist/cover/update";
//调整歌单顺序
const _playlistOrderUpdate = "/playlist/order/update";
//调整歌曲顺序
const _songOrderUpdate = "/song/order/update";
//转发用户动态
const _eventForward = "/event/forward";
//删除用户动态
const _eventDel = "/event/del";
//分享歌曲、歌单、mv、电台、电台节目到动态
const _shareResource = "/share/resource";
//获取动态评论
const _commentEvent = "/comment/event";
//关注/取消关注用户
const _follow = "/follow";
//获取热门话题
const _hotTopic = "/hot/topic";
//云村热评
const _commentHotwall = "/comment/hotwall/list";
//心动模式/智能播放
const _playmodeIntelligence = "/playmode/intelligence/list";
//歌手热门50首歌曲
const _artistTopSong = "/artist/top/song";
//歌手全部歌曲
const _artistSongs = "/artist/songs";
//收藏的专栏
const _topicSublist = "/topic/sublist";
//收藏视频
const _videoSub = "/video/sub";
//收藏/取消收藏 MV
const _mvSub = "/mv/sub";
//收藏的 MV 列表
const _mvSublist = "/mv/sublist";
//精品歌单标签列表
const _playlistHighqualityTags = "/playlist/highquality/tags";
//相关歌单推荐
const _relatedPlaylist = "/related/playlist";
//默认搜索关键词
const _searchDefault = "/search/default";
//热搜列表(详细)
const _searchHotDetail = "/search/hot/detail";
//删除歌单
const _playlistDelete = "/playlist/delete";
//歌单收藏者
const _playlistSubscribers = "/playlist/subscribers";
//收藏视频到视频歌单
const _playlistTrackAdd = "/playlist/track/add";
//删除视频歌单里的视频
const _playlistTrackDelete = "/playlist/track/delete";
//最近播放的视频
const _playlistVideoRecent = "/playlist/video/recent";
//新歌速递
const _topSong = "/top/song";
//首页-发现
const _homepageBlockpage = "/homepage/block/page";
//首页-发现-圆形图标入口列表
const _homepageDragonball = "/homepage/dragon/ball";
//楼层评论
const _commentFloor = "/comment/floor";
//视频评论
const _commentVideo = "/comment/video";
//热门评论
const _commentHot = "/comment/hot";
//新版评论接口
const _commentNew = "/comment/new";
//抱一抱评论
const _hugComment = "/hug/comment";
//评论抱一抱列表
const _commentHuglist = "/comment/hug/list";
//发送/删除评论
const _comment = "/comment";
//资源点赞( MV,电台,视频)
const _resourceLike = "/resource/like";
//获取点赞过的视频
const _playlistMylike = "/playlist/mylike";
//专辑动态信息
const _albumDetailDynamic = "/album/detail/dynamic";
//收藏/取消收藏专辑
const _albumSub = "/album/sub";
//获取已收藏专辑列表
const _albumSublist = "/album/sublist";
//获取歌手详情
const _artistDetail = "/artist/detail";
//获取历史日推可用日期列表
const _historyRecommendSongs = "/history/recommend/songs";
//获取历史日推详情数据
const _historyRecommendSongsDetail = "/history/recommend/songs/detail";
//喜欢音乐列表
const _likelist = "/likelist";
//全部新碟
const _albumNew = "/album/new";
//最新专辑
const _albumNewest = "/album/newest";
//听歌打卡
const _scrobble = "/scrobble";
//全部 mv
const _mvAll = "/mv/all";
//网易出品mv
const _mvExclusiveRcmd = "/mv/exclusive/rcmd";
//独家放送列表
const _personalizedPrivatecontentList = "/personalized/privatecontent/list";
//获取 mv 点赞转发评论数数据
const _mvDetailinfo = "/mv/detail/info";
//获取视频标签列表
const _videoGrouplist = "/video/group/list";
//获取视频分类列表
const _videCategorylist = "/video/category/list";
//获取视频标签/分类下的视频
const _videoGroup = "/video/group";
//获取全部视频列表
const _videoTimelineAll = "/video/timeline/all";
//相关视频
const _relatedAllvideo = "/related/allvideo";
//视频详情
const _videoDetail = "/video/detail";
//获取视频点赞转发评论数数据
const _videoDetailinfo = "/video/detail/info";
//获取视频播放地址
const _videoUrl = "/video/url";
//云盘数据详情
const _userClouddetail = "/user/cloud/detail";
//云盘歌曲删除
const _userClouddel = "/user/cloud/del";
//电台banner
const _djBanner = "/dj/banner";
//电台个性推荐
const _djPersonalizeRecommend = "/dj/personalize/recommend";
//电台订阅者列表
const _djSubscriber = "/dj/subscriber";
//用户电台
const _userAudio = "/user/audio";
//热门电台
const _djHot = "/dj/hot";
//电台 - 节目榜
const _djProgramToplist = "/dj/program/toplist";
//电台 - 付费精品
const _djToplistPay = "/dj/toplist/pay";
//电台 - 24小时节目榜
const _djProgramtoplistHours = "/dj/program/toplist/hours";
//电台 - 主播新人榜
const _djToplistNewcomer = "/dj/toplist/newcomer";
//电台 - 最热主播榜
const _djToplistPopular = "/dj/toplist/popular";
//电台 - 新晋电台榜/热门电台榜
const _djToplist = "/dj/toplist";
//电台 - 类别热门电台
const _djRadioHot = "/dj/radio/hot";
//电台 - 非热门类型
const _djCategoryexcludehot = "/dj/category/excludehot";
//电台 - 推荐类型
const _djCategoryRecommend = "/dj/category/recommend"
//电台 - 今日优选
const _djTodayPerfered = "/dj/today/perfered";
//电台 - 节目详情
const _djProgramDetail = "/dj/program/detail";
//通知 - 私信
const _msgPrivate = "/msg/private";
//发送私信音乐
const _sendSong = "/send/song";
//最近联系人
const _msgRecentContact = "/msg/recentcontact";
//私信内容
const _msgPrivateHistory = "/msg/private/history";
//通知 - 评论
const _msgComments = "/msg/comments";
//通知 - @我
const _msgForwards = "/msg/forwards";
//通知 - 通知
const _msgNotices = "/msg/notices";
//设置
const _setting = "/setting";
//数字专辑-新碟上架
const _albumList = "/album/list";
//数字专辑&数字单曲-榜单
const _album_songsaleboard = "/album_songsaleboard";
//数字专辑-语种风格馆
const _albumListStyle = "/album/list/style";
//数字专辑详情
const _albumDetail = "/album/detail";
//我的数字专辑
const _digitalAlbumpurchased = "/digitalAlbum/purchased";
//购买数字专辑
const _digitalAlbumordering = "/digitalAlbum/ordering";
//音乐日历
const _calendar = "/calendar";
//云贝
const _yunbei = "/yunbei";
//云贝今日签到信息
const _yunbeiToday = "/yunbei/today";
//云贝签到
const _yunbeiSign = "/yunbei/sign";
//云贝账户信息
const _yunbeiInfo = "/yunbei/info";
//云贝所有任务
const _yunbeiTasks = "/yunbei/tasks";
//云贝todo任务
const _yunbeiTaskstodo = "/yunbei/tasks/todo";
//云贝完成任务
const _yunbeiTaskfinish = "/yunbei/task/finish";
//云贝收入
const _yunbeiTasksreceipt = "/yunbei/tasks/receipt";
//云贝支出
const _yunbeiTasksexpense = "/yunbei/tasks/expense";
//关注歌手新歌
const _artistNewsong = "/artist/new/song";
//关注歌手新MV
const _artistNewmv = "/artist/new/mv";
//batch批量请求接口
const _batch = "/batch";
// #endif
export default function(Vue){
		Vue.prototype.$_banner = banners;
		Vue.prototype.$_phoneLogin = phoneLogin;
		Vue.prototype.$_emailLogin = emailLogin;
		Vue.prototype.$_refreshLogin = refreshLogin;
		Vue.prototype.$_captchaSent = captchaSent;
		Vue.prototype.$_captchaVerify = captchaVerify;
		Vue.prototype.$_registerCellphone = registerCellphone;
		Vue.prototype.$_cellphoneCheck = cellphoneCheck;
		Vue.prototype.$_activateProfile = activateProfile;
		Vue.prototype.$_rebind = rebind;
		Vue.prototype.$_event = _event;
		Vue.prototype.$_artistList = _artistList;
		Vue.prototype.$_artistSub = _artistSub;
		Vue.prototype.$_playlistCatlist = _playlistCatlist;
		Vue.prototype.$_playlistHot = _playlistHot;
		Vue.prototype.$_topPlaylsit = _topPlaylsit;
		Vue.prototype.$_topPlaylistHighquality = _topPlaylistHighquality;
		Vue.prototype.$_playlistDetail = _playlistDetail;
		Vue.prototype.$_musicUrl = _musicUrl;
		Vue.prototype.$_checkMusic = _checkMusic;
		Vue.prototype.$_secrch = _secrch;
		Vue.prototype.$_searchSuggest = _searchSuggest;
		Vue.prototype.$_searchMultimatch = _searchMultimatch;
		Vue.prototype.$_playlistCreate = _playlistCreate;
		Vue.prototype.$_playlistSubscribe = _playlistSubscribe;
		Vue.prototype.$_lyric = _lyric;
		Vue.prototype.$_commentMusic = _commentMusic;
		Vue.prototype.$_commentAlbum = _commentAlbum;
		Vue.prototype.$_commentPlaylist = _commentPlaylist;
		Vue.prototype.$_commentMv = _commentMv;
		Vue.prototype.$_commentDj = _commentDj;
		Vue.prototype.$_songDetail = _songDetail;
		Vue.prototype.$_album = _album;
		Vue.prototype.$_artists = _artists;
		Vue.prototype.$_artistsMv = _artistsMv;
		Vue.prototype.$_artistAlbum = _artistAlbum;
		Vue.prototype.$_artistDesc = _artistDesc;
		Vue.prototype.$_simiArtist = _simiArtist;
		Vue.prototype.$_simiPlaylist = _simiPlaylist;
		Vue.prototype.$_simiMv = _simiMv;
		Vue.prototype.$_simiSong = _simiSong;
		Vue.prototype.$_simiUser = _simiUser;
		Vue.prototype.$_like = _like;
		Vue.prototype.$_fmTrash = _fmTrash;
		Vue.prototype.$_topAlbum = _topAlbum;
		Vue.prototype.$_topArtists = _topArtists;
		Vue.prototype.$_mvFirst = _mvFirst;
		Vue.prototype.$_personalizedMv = _personalizedMv;
		Vue.prototype.$_personalized = _personalized;
		Vue.prototype.$_personalizedNewsong = _personalizedNewsong;
		Vue.prototype.$_presonalizedDjprogram = _presonalizedDjprogram;
		Vue.prototype.$_programRecommend = _programRecommend;
		Vue.prototype.$_personalizedPrivatecontent = _personalizedPrivatecontent;
		Vue.prototype.$_topMv = _topMv;
		Vue.prototype.$_mv = _mv;
		Vue.prototype.$_mvUrl = _mvUrl;
		Vue.prototype.$_topList = _topList;
		Vue.prototype.$_toplistAll = _toplistAll;
		Vue.prototype.$_toplistDetail = _toplistDetail;
		Vue.prototype.$_toplistArtist = _toplistArtist;
		Vue.prototype.$_userDetail = _userDetail;
		Vue.prototype.$_userSubcount = _userSubcount;
		Vue.prototype.$_userPlaylist = _userPlaylist;
		Vue.prototype.$_playlistUpdate = _playlistUpdate;
		Vue.prototype.$_sendText = _sendText;
		Vue.prototype.$_sendPlaylist = _sendPlaylist;
		Vue.prototype.$_userDj = _userDj;
		Vue.prototype.$_userFollows = _userFollows;
		Vue.prototype.$_userfolloweds = _userfolloweds;
		Vue.prototype.$_userEvent = _userEvent;
		Vue.prototype.$_userRecord = _userRecord;
		Vue.prototype.$_playlistTracks = _playlistTracks;
		Vue.prototype.$_commentLike = _commentLike;
		Vue.prototype.$_recommendResource = _recommendResource;
		Vue.prototype.$_recommendSongs = _recommendSongs;
		Vue.prototype.$_personalFm = _personalFm;
		Vue.prototype.$_dailySignin = _dailySignin;
		Vue.prototype.$_userCloud = _userCloud;
		Vue.prototype.$_djRecommend = _djRecommend;
		Vue.prototype.$_djCatelist = _djCatelist;
		Vue.prototype.$_djRecommendType = _djRecommendType;
		Vue.prototype.$_djSub = _djSub;
		Vue.prototype.$_djSublist = _djSublist;
		Vue.prototype.$_djDetail = _djDetail;
		Vue.prototype.$_djProgram = _djProgram;
		Vue.prototype.$_djPaygift = _djPaygift;
		Vue.prototype.$_logout = _logout;
		Vue.prototype.$_loginStatus = _loginStatus;
		Vue.prototype.$_userAccount = _userAccount;
		Vue.prototype.$_userLevel = _userLevel;
		Vue.prototype.$_userBinding = _userBinding;
		Vue.prototype.$_userReplacephone = _userReplacephone;
		Vue.prototype.$_userUpdate = _userUpdate;
		Vue.prototype.$_avatarUpload = _avatarUpload;
		Vue.prototype.$_countriesCode = _countriesCode;
		Vue.prototype.$_playlistDeseUpdate = _playlistDeseUpdate;
		Vue.prototype.$_playlistNameUpdate = _playlistNameUpdate;
		Vue.prototype.$_playlistTagsUpdate = _playlistTagsUpdate;
		Vue.prototype.$_playlistCoverUpdate = _playlistCoverUpdate;
		Vue.prototype.$_playlistOrderUpdate = _playlistOrderUpdate;
		Vue.prototype.$_songOrderUpdate = _songOrderUpdate;
		Vue.prototype.$_eventForward = _eventForward;
		Vue.prototype._eventDel = _eventDel;
		Vue.prototype.$_shareResource = _shareResource;
		Vue.prototype.$_commentEvent = _commentEvent;
		Vue.prototype.$_follow = _follow;
		Vue.prototype.$_hotTopic = _hotTopic;
		Vue.prototype.$_commentHotwall = _commentHotwall;
		Vue.prototype.$_playmodeIntelligence = _playmodeIntelligence;
		Vue.prototype.$_artistTopSong = _artistTopSong;
		Vue.prototype.$_artistSongs = _artistSongs;
		Vue.prototype.$_topicSublist = _topicSublist;
		Vue.prototype.$_videoSub = _videoSub;
		Vue.prototype.$_mvSub = _mvSub;
		Vue.prototype.$_mvSublist = _mvSublist;
		Vue.prototype.$_playlistHighqualityTags = _playlistHighqualityTags;
		Vue.prototype.$_relatedPlaylist = _relatedPlaylist;
		Vue.prototype.$_searchDefault = _searchDefault;
		Vue.prototype.$_searchHotDetail = _searchHotDetail;
		Vue.prototype.$_playlistDelete = _playlistDelete;
		Vue.prototype.$_playlistSubscribers = _playlistSubscribers;
		Vue.prototype.$_playlistTrackAdd = _playlistTrackAdd;
		Vue.prototype.$_playlistTrackDelete = _playlistTrackDelete;
		Vue.prototype.$_playlistVideoRecent = _playlistVideoRecent;
		Vue.prototype.$_topSong = _topSong;
		Vue.prototype.$_homepageBlockpage = _homepageBlockpage;
		Vue.prototype.$_homepageDragonball = _homepageDragonball;
		Vue.prototype.$_commentFloor = _commentFloor;
		Vue.prototype.$_commentVideo = _commentVideo;
		Vue.prototype.$_commentHot = _commentHot;
		Vue.prototype.$_commentNew = _commentNew;
		Vue.prototype.$_hugComment = _hugComment;
		Vue.prototype._commentHuglist = _commentHuglist;
		Vue.prototype.$_comment = _comment;
		Vue.prototype._resourceLike = _resourceLike;
		Vue.prototype.$_playlistMylike = _playlistMylike;
		Vue.prototype.$_albumDetailDynamic = _albumDetailDynamic;
		Vue.prototype.$_albumSub = _albumSub;
		Vue.prototype.$_albumSublist = _albumSublist;
		Vue.prototype.$_artistDetail = _artistDetail;
		Vue.prototype.$_historyRecommendSongs = _historyRecommendSongs;
		Vue.prototype.$_historyRecommendSongsDetail = _historyRecommendSongsDetail;
		Vue.prototype.$_likelist = _likelist;
		Vue.prototype.$_albumNew = _albumNew;
		Vue.prototype.$_albumNewest = _albumNewest;
		Vue.prototype.$_scrobble = _scrobble;
		Vue.prototype.$_mvAll = _mvAll;
		Vue.prototype.$_mvExclusiveRcmd = _mvExclusiveRcmd;
		Vue.prototype.$_personalizedPrivatecontentList = _personalizedPrivatecontentList;
		Vue.prototype.$_mvDetailinfo = _mvDetailinfo;
		Vue.prototype.$_videoGrouplist = _videoGrouplist;
		Vue.prototype.$_videCategorylist = _videCategorylist;
		Vue.prototype.$_videoGroup = _videoGroup;
		Vue.prototype.$_videoTimelineAll = _videoTimelineAll;
		Vue.prototype.$_commentDj = _commentDj;
		Vue.prototype.$_relatedAllvideo = _relatedAllvideo;
		Vue.prototype.$_videoDetail = _videoDetail;
		Vue.prototype.$_videoDetailinfo = _videoDetailinfo;
		Vue.prototype.$_videoUrl = _videoUrl;
		Vue.prototype.$_userClouddetail = _userClouddetail;
		Vue.prototype.$_userClouddel = _userClouddel;
		Vue.prototype.$_djBanner = _djBanner;
		Vue.prototype.$_djPersonalizeRecommend = _djPersonalizeRecommend;
		Vue.prototype.$_djSubscriber = _djSubscriber;
		Vue.prototype.$_userAudio = _userAudio;
		Vue.prototype.$_djHot = _djHot;
		Vue.prototype.$_djProgramToplist = _djProgramToplist;
		Vue.prototype.$_djToplistPay = _djToplistPay;
		Vue.prototype.$_djProgramtoplistHours = _djProgramtoplistHours;
		Vue.prototype.$_djToplistNewcomer = _djToplistNewcomer;
		Vue.prototype.$_djToplistPopular = _djToplistPopular;
		Vue.prototype.$_djToplist = _djToplist;
		Vue.prototype.$_djRadioHot = _djRadioHot;
		Vue.prototype.$_djCategoryexcludehot = _djCategoryexcludehot;
		Vue.prototype.$_djCategoryRecommend = _djCategoryRecommend;
		Vue.prototype.$_djTodayPerfered = _djTodayPerfered;
		Vue.prototype.$_djProgramDetail = _djProgramDetail;
		Vue.prototype.$_msgPrivate = _msgPrivate;
		Vue.prototype.$_sendSong = _sendSong;
		Vue.prototype.$_msgRecentContact = _msgRecentContact;
		Vue.prototype._msgPrivateHistory = _msgPrivateHistory;
		Vue.prototype.$_msgComments = _msgComments;
		Vue.prototype.$_msgForwards = _msgForwards;
		Vue.prototype.$_msgNotices = _msgNotices;
		Vue.prototype.$_setting = _setting;
		Vue.prototype.$_albumList = _albumList;
		Vue.prototype.$_album_songsaleboard = _album_songsaleboard;
		Vue.prototype.$_albumListStyle = _albumListStyle;
		Vue.prototype.$_albumDetail = _albumDetail;
		Vue.prototype.$_digitalAlbumpurchased = _digitalAlbumpurchased;
		Vue.prototype.$_digitalAlbumordering = _digitalAlbumordering;
		Vue.prototype.$_calendar = _calendar;
		Vue.prototype.$_yunbei = _yunbei;
		Vue.prototype.$_yunbeiToday = _yunbeiToday;
		Vue.prototype.$_yunbeiSign = _yunbeiSign;
		Vue.prototype.$_yunbeiInfo = _yunbeiInfo;
		Vue.prototype.$_yunbeiTasks = _yunbeiTasks;
		Vue.prototype.$_yunbeiTaskstodo = _yunbeiTaskstodo;
		Vue.prototype.$_yunbeiTaskfinish = _yunbeiTaskfinish;
		Vue.prototype.$_yunbeiTasksreceipt = _yunbeiTasksreceipt;
		Vue.prototype.$_yunbeiTasksexpense = _yunbeiTasksexpense;
		Vue.prototype.$_artistNewsong = _artistNewsong;
		Vue.prototype.$_artistNewmv = _artistNewmv;
		Vue.prototype._batch = _batch;
	}