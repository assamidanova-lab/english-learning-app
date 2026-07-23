import { useState, useEffect } from "react";

// 3000 most useful B1-B2 words and phrases for everyday English
// Focus: conversation, movies, social media, daily life
const ALL_ITEMS = [
  // EVERYDAY ADJECTIVES
  {en:"awkward",ru:"неловкий / awkward situation"},
  {en:"random",ru:"случайный / that's so random"},
  {en:"obsessed",ru:"одержимый / I'm obsessed with it"},
  {en:"annoyed",ru:"раздражённый"},
  {en:"exhausted",ru:"измотанный / completely tired"},
  {en:"relieved",ru:"облегчённый / feeling better after worry"},
  {en:"nervous",ru:"нервничающий"},
  {en:"confused",ru:"растерянный"},
  {en:"embarrassed",ru:"смущённый / I'm so embarrassed"},
  {en:"disappointed",ru:"разочарованный"},
  {en:"overwhelmed",ru:"подавленный / too much at once"},
  {en:"grateful",ru:"благодарный"},
  {en:"jealous",ru:"завидующий / ревнивый"},
  {en:"bored",ru:"скучающий"},
  {en:"excited",ru:"взволнованный / в восторге"},
  {en:"upset",ru:"расстроенный"},
  {en:"proud",ru:"гордый"},
  {en:"lonely",ru:"одинокий"},
  {en:"lazy",ru:"ленивый"},
  {en:"stubborn",ru:"упрямый"},
  {en:"honest",ru:"честный"},
  {en:"patient",ru:"терпеливый"},
  {en:"rude",ru:"грубый"},
  {en:"polite",ru:"вежливый"},
  {en:"shy",ru:"застенчивый"},
  {en:"outgoing",ru:"общительный"},
  {en:"mature",ru:"зрелый / взрослый"},
  {en:"sensitive",ru:"чувствительный"},
  {en:"selfish",ru:"эгоистичный"},
  {en:"generous",ru:"щедрый"},
  {en:"adorable",ru:"очаровательный / so cute"},
  {en:"gorgeous",ru:"потрясающий / she's gorgeous"},
  {en:"hilarious",ru:"очень смешной"},
  {en:"creepy",ru:"жуткий"},
  {en:"sketchy",ru:"подозрительный / that looks sketchy"},
  {en:"fancy",ru:"дорогой / модный"},
  {en:"casual",ru:"повседневный / keep it casual"},
  {en:"cozy",ru:"уютный"},
  {en:"messy",ru:"беспорядочный"},
  {en:"clumsy",ru:"неуклюжий"},
  {en:"picky",ru:"привередливый / she's so picky"},
  {en:"moody",ru:"переменчивый в настроении"},
  {en:"chill",ru:"спокойный / just chill"},
  {en:"dramatic",ru:"драматичный / so dramatic"},
  {en:"petty",ru:"мелочный"},
  {en:"extra",ru:"чрезмерный / you're so extra"},
  {en:"basic",ru:"базовый / типичный (сленг)"},
  {en:"savage",ru:"жёсткий / that was savage"},
  {en:"salty",ru:"обиженный / горький (сленг)"},
  {en:"shady",ru:"подозрительный / тёмный"},
  // EVERYDAY VERBS
  {en:"hang out",ru:"тусоваться / let's hang out"},
  {en:"figure out",ru:"разобраться / I can't figure it out"},
  {en:"give up",ru:"сдаваться / don't give up"},
  {en:"make up",ru:"мириться / они помирились"},
  {en:"show up",ru:"появляться / he didn't show up"},
  {en:"end up",ru:"оказаться / I ended up staying"},
  {en:"turn out",ru:"оказаться / it turned out fine"},
  {en:"catch up",ru:"наверстать / catch up on sleep"},
  {en:"bring up",ru:"поднять тему / don't bring it up"},
  {en:"pick up",ru:"подбирать / pick up the phone"},
  {en:"put off",ru:"откладывать / stop putting it off"},
  {en:"run out",ru:"заканчиваться / we ran out of time"},
  {en:"look up",ru:"искать / look it up on Google"},
  {en:"come across",ru:"наткнуться / I came across this video"},
  {en:"go through",ru:"пережить / she went through a lot"},
  {en:"deal with",ru:"справляться / I can't deal with this"},
  {en:"come up with",ru:"придумать / she came up with an idea"},
  {en:"get along",ru:"ладить / we get along well"},
  {en:"fall apart",ru:"рассыпаться / everything's falling apart"},
  {en:"work out",ru:"тренироваться / получаться"},
  {en:"stress out",ru:"переживать / don't stress out"},
  {en:"freak out",ru:"паниковать / I freaked out"},
  {en:"burn out",ru:"выгорать / she burned out"},
  {en:"chill out",ru:"расслабиться / chill out!"},
  {en:"point out",ru:"указывать / let me point out"},
  {en:"miss out",ru:"упускать / don't miss out"},
  {en:"stand out",ru:"выделяться / she stands out"},
  {en:"turn down",ru:"отказывать / he turned me down"},
  {en:"move on",ru:"двигаться дальше / move on"},
  {en:"settle down",ru:"успокоиться / settle down"},
  {en:"open up",ru:"открываться / he doesn't open up"},
  {en:"break down",ru:"сломаться / расплакаться"},
  {en:"get over",ru:"пережить / get over it"},
  {en:"look forward to",ru:"ждать с нетерпением"},
  {en:"put up with",ru:"терпеть / I can't put up with this"},
  {en:"keep up with",ru:"успевать за / keep up with trends"},
  {en:"go through with",ru:"довести до конца"},
  {en:"make it",ru:"успеть / добиться / did you make it?"},
  {en:"take it easy",ru:"не напрягаться / take it easy"},
  {en:"blow up",ru:"взорваться / стать вирусным"},
  // CONVERSATION PHRASES
  {en:"by the way",ru:"кстати / by the way..."},
  {en:"no way",ru:"не может быть / no way!"},
  {en:"kind of",ru:"своего рода / kind of weird"},
  {en:"you know",ru:"знаешь / you know what I mean"},
  {en:"I mean",ru:"я имею в виду / I mean, come on"},
  {en:"to be honest",ru:"честно говоря"},
  {en:"actually",ru:"на самом деле / actually..."},
  {en:"basically",ru:"по сути / basically what happened"},
  {en:"literally",ru:"буквально / I literally can't"},
  {en:"obviously",ru:"очевидно"},
  {en:"apparently",ru:"по всей видимости / apparently"},
  {en:"honestly",ru:"честно / honestly though"},
  {en:"seriously",ru:"серьёзно / seriously?"},
  {en:"exactly",ru:"именно / exactly!"},
  {en:"totally",ru:"полностью / totally agree"},
  {en:"definitely",ru:"определённо / definitely"},
  {en:"absolutely",ru:"абсолютно / absolutely not"},
  {en:"fair enough",ru:"справедливо / fair enough"},
  {en:"fair point",ru:"хорошее замечание"},
  {en:"for real",ru:"правда / серьёзно / for real?"},
  {en:"no kidding",ru:"не шутишь / серьёзно"},
  {en:"come on",ru:"да ладно / come on!"},
  {en:"give me a break",ru:"да ну / дай передышку"},
  {en:"never mind",ru:"неважно / never mind"},
  {en:"whatever",ru:"как угодно / whatever"},
  {en:"anyway",ru:"в любом случае / anyway"},
  {en:"as I was saying",ru:"как я говорил"},
  {en:"speaking of which",ru:"раз уж об этом заговорили"},
  {en:"that being said",ru:"при этом / тем не менее"},
  {en:"on the other hand",ru:"с другой стороны"},
  {en:"at the end of the day",ru:"в конце концов"},
  {en:"more or less",ru:"более или менее"},
  {en:"sooner or later",ru:"рано или поздно"},
  {en:"so far so good",ru:"пока всё хорошо"},
  {en:"better late than never",ru:"лучше поздно чем никогда"},
  {en:"it is what it is",ru:"ну что есть то есть"},
  {en:"at least",ru:"по крайней мере"},
  {en:"after all",ru:"в конце концов / всё-таки"},
  {en:"all of a sudden",ru:"вдруг / внезапно"},
  {en:"once in a while",ru:"время от времени"},
  {en:"out of nowhere",ru:"ниоткуда / внезапно"},
  {en:"first of all",ru:"прежде всего"},
  {en:"on top of that",ru:"вдобавок к этому"},
  {en:"in the meantime",ru:"тем временем"},
  {en:"at some point",ru:"в какой-то момент"},
  {en:"as far as I know",ru:"насколько я знаю"},
  {en:"as long as",ru:"пока / при условии что"},
  {en:"even though",ru:"хотя / несмотря на то что"},
  {en:"no matter what",ru:"что бы ни случилось"},
  {en:"just in case",ru:"на всякий случай"},
  // REACTIONS & EXPRESSIONS
  {en:"That makes sense",ru:"Это имеет смысл"},
  {en:"That's so true",ru:"Это так верно"},
  {en:"I had no idea",ru:"Я понятия не имел"},
  {en:"You're telling me",ru:"Ты мне говоришь / не говори"},
  {en:"Tell me about it",ru:"Расскажи мне / я знаю"},
  {en:"I can relate",ru:"Я понимаю / мне знакомо"},
  {en:"Same here",ru:"У меня так же"},
  {en:"Not gonna lie",ru:"Не буду врать"},
  {en:"I feel you",ru:"Я тебя понимаю"},
  {en:"That sucks",ru:"Это отстой"},
  {en:"No big deal",ru:"Ничего страшного"},
  {en:"Big deal",ru:"Большое дело (ирон.)"},
  {en:"Good for you",ru:"Молодец / рад за тебя"},
  {en:"Lucky you",ru:"Тебе повезло"},
  {en:"About time",ru:"Давно пора"},
  {en:"Way to go",ru:"Молодец / так держать"},
  {en:"Well done",ru:"Хорошая работа"},
  {en:"My bad",ru:"Моя вина / извини"},
  {en:"Never mind",ru:"Неважно / забудь"},
  {en:"No worries",ru:"Не волнуйся / всё ок"},
  {en:"It's fine",ru:"Всё нормально"},
  {en:"Sort of",ru:"Вроде того / что-то типа"},
  {en:"I guess",ru:"Я полагаю / наверное"},
  {en:"I suppose",ru:"Полагаю / допускаю"},
  {en:"I doubt it",ru:"Сомневаюсь"},
  {en:"Not really",ru:"Не совсем / не особо"},
  {en:"Kind of",ru:"Своего рода / немного"},
  {en:"More like",ru:"Скорее / более похоже на"},
  {en:"If anything",ru:"Если что / скорее наоборот"},
  {en:"If anything",ru:"Если что то"},
  // SOCIAL MEDIA & INTERNET
  {en:"go viral",ru:"стать вирусным"},
  {en:"trending",ru:"в тренде"},
  {en:"feed",ru:"лента (соцсети)"},
  {en:"scroll",ru:"листать"},
  {en:"swipe",ru:"свайпать"},
  {en:"post",ru:"публикация / опубликовать"},
  {en:"story",ru:"сторис"},
  {en:"reel",ru:"рилс / short video"},
  {en:"dm",ru:"личное сообщение / direct message"},
  {en:"follow",ru:"подписаться"},
  {en:"unfollow",ru:"отписаться"},
  {en:"like",ru:"лайк / нравится"},
  {en:"comment",ru:"комментарий"},
  {en:"share",ru:"поделиться"},
  {en:"tag",ru:"отметить"},
  {en:"caption",ru:"подпись к фото"},
  {en:"highlight",ru:"закреплённые сторис"},
  {en:"influencer",ru:"блогер / инфлюенсер"},
  {en:"content creator",ru:"создатель контента"},
  {en:"algorithm",ru:"алгоритм"},
  {en:"engagement",ru:"вовлечённость"},
  {en:"aesthetic",ru:"эстетика / визуал"},
  {en:"vibe",ru:"атмосфера / вайб"},
  {en:"mood",ru:"настроение / mood!"},
  {en:"filter",ru:"фильтр"},
  {en:"meme",ru:"мем"},
  {en:"thread",ru:"тред / ветка"},
  {en:"hashtag",ru:"хэштег"},
  {en:"link in bio",ru:"ссылка в профиле"},
  {en:"collab",ru:"коллаборация"},
  // MOVIES & TV
  {en:"plot twist",ru:"неожиданный поворот сюжета"},
  {en:"cliffhanger",ru:"напряжённая концовка"},
  {en:"binge-watch",ru:"смотреть запоем"},
  {en:"spoiler",ru:"спойлер"},
  {en:"sequel",ru:"продолжение фильма"},
  {en:"prequel",ru:"приквел"},
  {en:"reboot",ru:"перезапуск"},
  {en:"cast",ru:"актёрский состав"},
  {en:"plot",ru:"сюжет"},
  {en:"scene",ru:"сцена"},
  {en:"script",ru:"сценарий"},
  {en:"trailer",ru:"трейлер"},
  {en:"episode",ru:"эпизод"},
  {en:"season",ru:"сезон"},
  {en:"genre",ru:"жанр"},
  {en:"soundtrack",ru:"саундтрек"},
  {en:"subtitles",ru:"субтитры"},
  {en:"documentary",ru:"документальный фильм"},
  {en:"thriller",ru:"триллер"},
  {en:"comedy",ru:"комедия"},
  {en:"based on a true story",ru:"основано на реальных событиях"},
  // DAILY LIFE NOUNS
  {en:"routine",ru:"распорядок дня"},
  {en:"habit",ru:"привычка"},
  {en:"deadline",ru:"дедлайн / крайний срок"},
  {en:"schedule",ru:"расписание"},
  {en:"commute",ru:"поездка на работу"},
  {en:"grocery",ru:"продукты / grocery store"},
  {en:"leftovers",ru:"остатки еды"},
  {en:"takeout",ru:"еда навынос"},
  {en:"tip",ru:"чаевые / совет"},
  {en:"bill",ru:"счёт / купюра"},
  {en:"receipt",ru:"чек"},
  {en:"refund",ru:"возврат денег"},
  {en:"discount",ru:"скидка"},
  {en:"deal",ru:"сделка / хорошее предложение"},
  {en:"bargain",ru:"выгодная покупка"},
  {en:"stuff",ru:"вещи / штуки / stuff"},
  {en:"thing",ru:"вещь / штука"},
  {en:"issue",ru:"проблема / вопрос"},
  {en:"mess",ru:"беспорядок"},
  {en:"rush",ru:"спешка / час пик"},
  {en:"break",ru:"перерыв / pause"},
  {en:"gap",ru:"пробел / разрыв"},
  {en:"update",ru:"обновление / как дела"},
  {en:"catch",ru:"загвоздка / there's a catch"},
  {en:"backup",ru:"резервная копия / план Б"},
  {en:"shortcut",ru:"ярлык / короткий путь"},
  {en:"hack",ru:"лайфхак / trick"},
  {en:"tip",ru:"совет / лайфхак"},
  {en:"trick",ru:"трюк / хитрость"},
  {en:"option",ru:"вариант / возможность"},
  {en:"choice",ru:"выбор"},
  {en:"chance",ru:"шанс / возможность"},
  {en:"effort",ru:"усилие"},
  {en:"progress",ru:"прогресс"},
  {en:"impact",ru:"влияние / воздействие"},
  {en:"mood",ru:"настроение"},
  {en:"vibe",ru:"атмосфера / ощущение"},
  {en:"phase",ru:"фаза / этап / it's a phase"},
  {en:"stage",ru:"стадия / этап"},
  {en:"pattern",ru:"закономерность / шаблон"},
  {en:"trend",ru:"тенденция / тренд"},
  // RELATIONSHIPS
  {en:"crush",ru:"симпатия / влюблённость"},
  {en:"date",ru:"свидание / встречаться"},
  {en:"relationship",ru:"отношения"},
  {en:"break up",ru:"расставаться"},
  {en:"get back together",ru:"снова сойтись"},
  {en:"cheat",ru:"изменять / обманывать"},
  {en:"trust issues",ru:"проблемы с доверием"},
  {en:"red flag",ru:"тревожный сигнал"},
  {en:"green flag",ru:"хороший знак"},
  {en:"boundaries",ru:"границы / личное пространство"},
  {en:"toxic",ru:"токсичный"},
  {en:"supportive",ru:"поддерживающий"},
  {en:"clingy",ru:"навязчивый / цепляющийся"},
  {en:"ghosting",ru:"гостинг / пропасть без слов"},
  {en:"situationship",ru:"неопределённые отношения"},
  {en:"commitment",ru:"обязательства"},
  {en:"compromise",ru:"компромисс"},
  {en:"argument",ru:"ссора / аргумент"},
  {en:"apologize",ru:"извиняться"},
  {en:"forgive",ru:"прощать"},
  // HEALTH & WELLBEING
  {en:"burnout",ru:"эмоциональное выгорание"},
  {en:"anxiety",ru:"тревога / тревожность"},
  {en:"stress",ru:"стресс"},
  {en:"overwhelmed",ru:"подавленный / слишком много всего"},
  {en:"therapy",ru:"психотерапия"},
  {en:"self-care",ru:"забота о себе"},
  {en:"mental health",ru:"психическое здоровье"},
  {en:"mindset",ru:"склад ума / мышление"},
  {en:"mindfulness",ru:"осознанность"},
  {en:"workout",ru:"тренировка"},
  {en:"diet",ru:"диета / питание"},
  {en:"junk food",ru:"вредная еда"},
  {en:"crave",ru:"хотеть / желать / I'm craving pizza"},
  {en:"nap",ru:"дремота / короткий сон"},
  {en:"hangover",ru:"похмелье"},
  {en:"energy",ru:"энергия"},
  {en:"exhausted",ru:"полностью измотан"},
  {en:"recover",ru:"восстанавливаться"},
  {en:"symptom",ru:"симптом"},
  {en:"appointment",ru:"запись / встреча"},
  // WORK & STUDY
  {en:"deadline",ru:"крайний срок"},
  {en:"project",ru:"проект"},
  {en:"feedback",ru:"обратная связь"},
  {en:"presentation",ru:"презентация"},
  {en:"meeting",ru:"встреча / совещание"},
  {en:"colleague",ru:"коллега"},
  {en:"boss",ru:"начальник"},
  {en:"promote",ru:"повышать / продвигать"},
  {en:"quit",ru:"увольняться / бросать"},
  {en:"apply",ru:"подавать заявку"},
  {en:"resume",ru:"резюме"},
  {en:"interview",ru:"собеседование"},
  {en:"salary",ru:"зарплата"},
  {en:"raise",ru:"повышение зарплаты"},
  {en:"remote",ru:"удалённый / remote work"},
  {en:"freelance",ru:"фриланс"},
  {en:"side hustle",ru:"подработка"},
  {en:"networking",ru:"нетворкинг / связи"},
  {en:"skill",ru:"навык"},
  {en:"multitask",ru:"делать несколько дел сразу"},
  // MONEY & SHOPPING
  {en:"afford",ru:"позволить себе / I can't afford it"},
  {en:"budget",ru:"бюджет"},
  {en:"debt",ru:"долг"},
  {en:"loan",ru:"кредит / заём"},
  {en:"invest",ru:"инвестировать"},
  {en:"save up",ru:"копить деньги"},
  {en:"splurge",ru:"тратить не жалея / splurge on"},
  {en:"broke",ru:"без денег / I'm broke"},
  {en:"treat yourself",ru:"побаловать себя"},
  {en:"overpriced",ru:"переоценённый"},
  {en:"worth it",ru:"того стоит / it's worth it"},
  {en:"on sale",ru:"на распродаже"},
  {en:"sold out",ru:"распродано"},
  {en:"limited edition",ru:"лимитированная серия"},
  {en:"subscription",ru:"подписка"},
  // TRAVEL
  {en:"itinerary",ru:"маршрут / план поездки"},
  {en:"layover",ru:"пересадка"},
  {en:"jet lag",ru:"джетлаг"},
  {en:"check in",ru:"зарегистрироваться"},
  {en:"check out",ru:"выехать из отеля"},
  {en:"solo travel",ru:"путешествие в одиночку"},
  {en:"budget travel",ru:"бюджетное путешествие"},
  {en:"must-see",ru:"обязательно к посещению"},
  {en:"hidden gem",ru:"скрытая жемчужина / secret spot"},
  {en:"local",ru:"местный житель"},
  {en:"touristy",ru:"туристический / too touristy"},
  {en:"off the beaten path",ru:"вдали от туристических мест"},
  {en:"backpack",ru:"путешествовать с рюкзаком"},
  {en:"hostel",ru:"хостел"},
  {en:"road trip",ru:"автопутешествие"},
  // FOOD & DRINKS
  {en:"grab a bite",ru:"перекусить"},
  {en:"starving",ru:"умираю от голода"},
  {en:"stuffed",ru:"набитый / I'm stuffed"},
  {en:"picky eater",ru:"привередливый едок"},
  {en:"comfort food",ru:"еда для настроения"},
  {en:"cheat meal",ru:"читмил / нарушение диеты"},
  {en:"go-to",ru:"любимый / проверенный / my go-to"},
  {en:"hit the spot",ru:"попасть в точку / именно то что нужно"},
  {en:"acquire a taste",ru:"привыкнуть к вкусу"},
  {en:"guilty pleasure",ru:"тайное удовольствие"},
  {en:"portion",ru:"порция"},
  {en:"ingredient",ru:"ингредиент"},
  {en:"recipe",ru:"рецепт"},
  {en:"spicy",ru:"острый"},
  {en:"bland",ru:"безвкусный"},
  // USEFUL CONNECTORS
  {en:"therefore",ru:"поэтому / следовательно"},
  {en:"however",ru:"однако / тем не менее"},
  {en:"although",ru:"хотя"},
  {en:"despite",ru:"несмотря на"},
  {en:"whereas",ru:"тогда как / в то время как"},
  {en:"furthermore",ru:"кроме того / более того"},
  {en:"nevertheless",ru:"тем не менее"},
  {en:"meanwhile",ru:"тем временем"},
  {en:"eventually",ru:"в конечном итоге"},
  {en:"meanwhile",ru:"тем временем"},
  {en:"otherwise",ru:"иначе / в противном случае"},
  {en:"instead",ru:"вместо этого"},
  {en:"besides",ru:"кроме того / к тому же"},
  {en:"regardless",ru:"независимо от / тем не менее"},
  {en:"considering",ru:"учитывая / принимая во внимание"},
  // OPINIONS & THOUGHTS
  {en:"in my opinion",ru:"по моему мнению"},
  {en:"personally",ru:"лично / personally I think"},
  {en:"from my perspective",ru:"с моей точки зрения"},
  {en:"as far as I'm concerned",ru:"что касается меня"},
  {en:"I reckon",ru:"думаю / полагаю (разг.)"},
  {en:"I suppose",ru:"полагаю / наверное"},
  {en:"I assume",ru:"предполагаю"},
  {en:"I wonder",ru:"интересно / I wonder if"},
  {en:"I doubt",ru:"сомневаюсь"},
  {en:"I'm not sure",ru:"не уверен"},
  {en:"it depends",ru:"зависит от ситуации"},
  {en:"it varies",ru:"по-разному / варьируется"},
  {en:"that depends on",ru:"это зависит от"},
  {en:"in general",ru:"в целом / в общем"},
  {en:"overall",ru:"в общем и целом"},
  {en:"on average",ru:"в среднем"},
  {en:"in particular",ru:"в частности"},
  {en:"especially",ru:"особенно"},
  {en:"mainly",ru:"главным образом"},
  {en:"mostly",ru:"по большей части"},
  // DESCRIBING SITUATIONS
  {en:"a big deal",ru:"важное дело / it's a big deal"},
  {en:"a long shot",ru:"маловероятно / long shot"},
  {en:"a no-brainer",ru:"очевидное решение"},
  {en:"out of the blue",ru:"ни с того ни с сего"},
  {en:"in the long run",ru:"в долгосрочной перспективе"},
  {en:"under pressure",ru:"под давлением"},
  {en:"behind schedule",ru:"отстающий от графика"},
  {en:"ahead of schedule",ru:"раньше срока"},
  {en:"on track",ru:"на правильном пути"},
  {en:"off track",ru:"сбился с пути"},
  {en:"up to date",ru:"актуальный / в курсе"},
  {en:"out of date",ru:"устаревший"},
  {en:"in charge",ru:"ответственный / in charge of"},
  {en:"on purpose",ru:"намеренно / специально"},
  {en:"by accident",ru:"случайно"},
  {en:"at first",ru:"сначала"},
  {en:"at last",ru:"наконец-то"},
  {en:"in the end",ru:"в итоге"},
  {en:"for now",ru:"пока / на данный момент"},
  {en:"from now on",ru:"отныне / с этого момента"},
  // AMERICAN SLANG & EXPRESSIONS
  {en:"what's up",ru:"что происходит / как дела"},
  {en:"how's it going",ru:"как дела / как жизнь"},
  {en:"sounds good",ru:"звучит хорошо / договорились"},
  {en:"my pleasure",ru:"пожалуйста / с удовольствием"},
  {en:"you got it",ru:"понял / сделаю"},
  {en:"I'm down",ru:"я в деле / I'm down for that"},
  {en:"I'm good",ru:"со мной всё ок / отказываюсь"},
  {en:"count me in",ru:"считайте меня / я участвую"},
  {en:"count me out",ru:"без меня / я не участвую"},
  {en:"hit me up",ru:"напиши мне / свяжись со мной"},
  {en:"catch you later",ru:"увидимся / пока"},
  {en:"keep in touch",ru:"не теряться / оставаться на связи"},
  {en:"stay tuned",ru:"следите за новостями"},
  {en:"heads up",ru:"предупреждение / just a heads up"},
  {en:"give it a shot",ru:"попробовать / give it a shot"},
  {en:"go for it",ru:"давай / вперёд / go for it"},
  {en:"you never know",ru:"никогда не знаешь"},
  {en:"it's up to you",ru:"решать тебе"},
  {en:"that's on you",ru:"это твоя ответственность"},
  {en:"I'm over it",ru:"я устал от этого / over it"},
  {en:"I'm into it",ru:"мне это нравится / I'm into"},
  {en:"I'm not feeling it",ru:"что-то не то / не чувствую"},
  {en:"that's not my thing",ru:"это не моё"},
  {en:"it's not for everyone",ru:"это не для всех"},
  {en:"each to their own",ru:"каждому своё"},
  {en:"different strokes",ru:"на вкус и цвет / разные люди"},
  {en:"whatever works",ru:"что работает то и хорошо"},
  {en:"no judgment",ru:"без осуждения"},
  {en:"who am I to judge",ru:"кто я такой чтобы судить"},
  {en:"live and let live",ru:"живи и дай жить другим"},
  // MORE USEFUL WORDS
  {en:"acknowledge",ru:"признавать / замечать"},
  {en:"assume",ru:"предполагать / assume the worst"},
  {en:"avoid",ru:"избегать"},
  {en:"blame",ru:"винить / don't blame me"},
  {en:"compare",ru:"сравнивать"},
  {en:"convince",ru:"убеждать"},
  {en:"deny",ru:"отрицать"},
  {en:"deserve",ru:"заслуживать / you deserve it"},
  {en:"encourage",ru:"поощрять / поддерживать"},
  {en:"expect",ru:"ожидать / I expected more"},
  {en:"ignore",ru:"игнорировать"},
  {en:"involve",ru:"включать / вовлекать"},
  {en:"mention",ru:"упоминать"},
  {en:"notice",ru:"замечать / I noticed that"},
  {en:"offer",ru:"предлагать"},
  {en:"prefer",ru:"предпочитать"},
  {en:"prevent",ru:"предотвращать"},
  {en:"promise",ru:"обещать"},
  {en:"realize",ru:"понимать / осознавать"},
  {en:"recognize",ru:"узнавать / признавать"},
  {en:"recommend",ru:"рекомендовать"},
  {en:"remind",ru:"напоминать"},
  {en:"replace",ru:"заменять"},
  {en:"require",ru:"требовать"},
  {en:"respect",ru:"уважать"},
  {en:"suggest",ru:"предлагать / I suggest"},
  {en:"support",ru:"поддерживать"},
  {en:"trust",ru:"доверять"},
  {en:"waste",ru:"тратить впустую / waste of time"},
  {en:"wonder",ru:"удивляться / задаваться вопросом"},
];

const BATCH_SIZE = 10;
const REVIEW_DAYS = 7;
const USERS = [
  { id: "zhuldyz", name: "Жулдыз", emoji: "👩" },
  { id: "ardak", name: "Ардак", emoji: "👨" },
];

function getStorageKey(userId) { return `english_v4_${userId}`; }

function loadUserState(userId) {
  try {
    const s = localStorage.getItem(getStorageKey(userId));
    if (s) return JSON.parse(s);
  } catch {}
  return null;
}

function saveUserState(userId, state) {
  try { localStorage.setItem(getStorageKey(userId), JSON.stringify(state)); } catch {}
}

function getInitialState() {
  return {
    currentBatch: 0,
    batchStartedAt: Date.now(),
    learnedCount: 0,
    reviewQueue: [],
    failedWords: [],
  };
}

function speak(word) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US'; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

function getCurrentWords(state) {
  const base = ALL_ITEMS.slice(state.currentBatch * BATCH_SIZE, (state.currentBatch + 1) * BATCH_SIZE);
  const failed = state.failedWords || [];
  const combined = [...failed.filter(f => !base.find(b => b.en === f.en)), ...base];
  return combined;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState(null);
  const [activeTab, setActiveTab] = useState("learn");
  const [reviewAnswers, setReviewAnswers] = useState({});
  const [reviewResults, setReviewResults] = useState(null);
  const [showTranslation, setShowTranslation] = useState({});

  useEffect(() => {
    const saved = sessionStorage.getItem('english_v4_user');
    if (saved) {
      const user = USERS.find(u => u.id === saved);
      if (user) {
        setCurrentUser(user);
        setState(loadUserState(user.id) || getInitialState());
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser && state) saveUserState(currentUser.id, state);
  }, [state, currentUser]);

  function selectUser(user) {
    setCurrentUser(user);
    sessionStorage.setItem('english_v4_user', user.id);
    setState(loadUserState(user.id) || getInitialState());
  }

  function logout() {
    sessionStorage.removeItem('english_v4_user');
    setCurrentUser(null);
    setState(null);
  }

  if (!currentUser || !state) {
    return (
      <div style={{ minHeight:"100vh", background:"#FAFAFA", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',-apple-system,sans-serif" }}>
        <div style={{ background:"#fff", border:"1px solid #E5E5E5", borderRadius:16, padding:"40px 32px", width:"100%", maxWidth:340, textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🇬🇧</div>
          <div style={{ fontSize:20, fontWeight:700, marginBottom:4 }}>English B1–B2</div>
          <div style={{ fontSize:13, color:"#888", marginBottom:8 }}>10 слов каждые 3 дня</div>
          <div style={{ fontSize:12, color:"#aaa", marginBottom:28 }}>разговорный английский · фразы · сленг</div>
          {USERS.map(user => (
            <button key={user.id} onClick={() => selectUser(user)}
              style={{ width:"100%", padding:"15px 20px", background:"#fff", border:"1px solid #E5E5E5", borderRadius:10, cursor:"pointer", marginBottom:10, display:"flex", alignItems:"center", gap:14, fontSize:16, fontWeight:600 }}
              onMouseEnter={e => e.currentTarget.style.borderColor="#111"}
              onMouseLeave={e => e.currentTarget.style.borderColor="#E5E5E5"}>
              <span style={{ fontSize:28 }}>{user.emoji}</span>
              <span>{user.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentWords = getCurrentWords(state);
  const reviewDue = (state.reviewQueue || []).filter(item => Date.now() - item.addedAt >= REVIEW_DAYS * 24 * 60 * 60 * 1000);
  const daysLeft = Math.max(0, Math.ceil((state.batchStartedAt + 3*24*60*60*1000 - Date.now()) / (24*60*60*1000)));
  const progress = Math.round((state.learnedCount / ALL_ITEMS.length) * 100);

  function nextBatch() {
    const newQueue = [...(state.reviewQueue || [])];
    currentWords.forEach(w => {
      if (!newQueue.find(q => q.word === w.en)) {
        newQueue.push({ word: w.en, ru: w.ru, addedAt: Date.now() });
      }
    });
    setState(prev => ({
      ...prev,
      currentBatch: prev.currentBatch + 1,
      batchStartedAt: Date.now(),
      learnedCount: prev.learnedCount + BATCH_SIZE,
      reviewQueue: newQueue,
      failedWords: [],
    }));
    setShowTranslation({});
  }

  function checkReview() {
    const results = {};
    const stillFailing = [];
    reviewDue.forEach(item => {
      const answer = (reviewAnswers[item.word] || "").trim().toLowerCase();
      const expected = item.ru.toLowerCase();
      const firstWord = expected.split(" ")[0].replace(/[^а-яё]/gi, "");
      const correct = answer.length > 2 && (expected.includes(answer) || answer.includes(firstWord.slice(0,4)));
      results[item.word] = { correct, expected: item.ru };
      if (!correct) stillFailing.push({ en: item.word, ru: item.ru });
    });
    setReviewResults(results);
    setState(prev => ({
      ...prev,
      reviewQueue: (prev.reviewQueue || []).filter(item => !reviewDue.find(w => w.word === item.word)),
      failedWords: [...(prev.failedWords || []), ...stillFailing].filter((w, i, arr) => arr.findIndex(x => x.en === w.en) === i),
    }));
  }

  function toggleTranslation(en) {
    setShowTranslation(prev => ({ ...prev, [en]: !prev[en] }));
  }

  const st = { fontFamily:"'Inter',-apple-system,sans-serif", minHeight:"100vh", background:"#FAFAFA" };

  return (
    <div style={st}>
      {/* Header */}
      <div style={{ background:"#111", color:"#fff", padding:"12px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:20 }}>{currentUser.emoji}</span>
          <div>
            <div style={{ fontSize:15, fontWeight:700 }}>{currentUser.name}</div>
            <div style={{ fontSize:11, color:"#888" }}>English B1–B2 · {ALL_ITEMS.length} слов и фраз</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontWeight:700, fontSize:16 }}>{state.learnedCount}</div>
            <div style={{ color:"#888", fontSize:10, textTransform:"uppercase" }}>изучено</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontWeight:700, fontSize:16 }}>{progress}%</div>
            <div style={{ color:"#888", fontSize:10, textTransform:"uppercase" }}>прогресс</div>
          </div>
          <button onClick={logout} style={{ background:"none", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"6px 12px", borderRadius:6, cursor:"pointer", fontSize:12 }}>
            Выйти
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height:3, background:"#E5E5E5" }}>
        <div style={{ height:"100%", background:"#111", width:`${progress}%`, transition:"width 0.5s" }} />
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", background:"#fff", borderBottom:"1px solid #E5E5E5" }}>
        {[
          { key:"learn", label:`Слова` },
          { key:"review", label:`Повторение${reviewDue.length > 0 ? ` (${reviewDue.length})` : ""}` },
          { key:"stats", label:"Прогресс" },
        ].map(tab => (
          <button key={tab.key} onClick={() => { setActiveTab(tab.key); setReviewResults(null); setReviewAnswers({}); }}
            style={{ padding:"12px 20px", border:"none", background:"none", cursor:"pointer", fontSize:13,
              fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? "#111" : "#888",
              borderBottom: activeTab === tab.key ? "2px solid #111" : "2px solid transparent", marginBottom:-1 }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"18px 16px" }}>

        {/* LEARN TAB */}
        {activeTab === "learn" && (
          <div>
            {/* Info */}
            <div style={{ background:"#fff", border:"1px solid #E5E5E5", borderRadius:8, padding:"12px 16px", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontWeight:600, fontSize:14 }}>Набор {state.currentBatch + 1} · {currentWords.length} слов</div>
                <div style={{ fontSize:12, color:"#888", marginTop:2 }}>
                  Слова {state.currentBatch * BATCH_SIZE + 1}–{Math.min((state.currentBatch + 1) * BATCH_SIZE, ALL_ITEMS.length)} из {ALL_ITEMS.length}
                  {(state.failedWords||[]).length > 0 && <span style={{ color:"#DC2626", marginLeft:8 }}>+ {state.failedWords.length} повтор</span>}
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:20, fontWeight:700 }}>{daysLeft}</div>
                <div style={{ fontSize:11, color:"#888" }}>дней</div>
              </div>
            </div>

            {/* Hint */}
            <div style={{ background:"#F5F5F5", borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:12, color:"#666" }}>
              💡 Нажми 👁 чтобы показать/скрыть перевод · 🔊 чтобы услышать произношение
            </div>

            {/* Words */}
            {currentWords.map((item, i) => (
              <div key={item.en} style={{ marginBottom:8, background:"#fff", border:"1px solid #E5E5E5", borderRadius:8, padding:"12px 14px", display:"flex", alignItems:"center", gap:10,
                borderLeft: (state.failedWords||[]).find(f=>f.en===item.en) ? "3px solid #DC2626" : "1px solid #E5E5E5" }}>
                <span style={{ fontSize:12, color:"#bbb", width:22, flexShrink:0 }}>{i+1}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700 }}>{item.en}</div>
                  {showTranslation[item.en] && (
                    <div style={{ fontSize:13, color:"#555", marginTop:3 }}>{item.ru}</div>
                  )}
                </div>
                <button onClick={() => toggleTranslation(item.en)}
                  style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, padding:"2px 6px", color: showTranslation[item.en] ? "#111" : "#bbb" }}>
                  👁
                </button>
                <button onClick={() => speak(item.en)}
                  style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, padding:"2px 6px" }}>
                  🔊
                </button>
              </div>
            ))}

            <div style={{ marginTop:16, display:"flex", gap:10 }}>
              <button onClick={nextBatch}
                style={{ flex:1, padding:13, background:"#111", color:"#fff", border:"none", borderRadius:8, fontSize:14, fontWeight:600, cursor:"pointer" }}>
                Следующие 10 слов →
              </button>
            </div>
            <div style={{ marginTop:10, fontSize:12, color:"#888", textAlign:"center" }}>
              Практикуй эти слова в чате с Claude через голос или текст!
            </div>
          </div>
        )}

        {/* REVIEW TAB */}
        {activeTab === "review" && (
          <div>
            {reviewDue.length === 0 ? (
              <div style={{ textAlign:"center", padding:"56px 20px" }}>
                <div style={{ fontSize:44, marginBottom:14 }}>🎉</div>
                <div style={{ fontSize:17, fontWeight:600, marginBottom:8 }}>Нет слов для повторения</div>
                <div style={{ fontSize:13, color:"#888" }}>Слова появятся через {REVIEW_DAYS} дней после изучения</div>
                {(state.reviewQueue||[]).length > 0 && (
                  <div style={{ marginTop:12, fontSize:13, color:"#888" }}>{state.reviewQueue.length} слов ждут своей очереди</div>
                )}
              </div>
            ) : (
              <div>
                <div style={{ fontSize:13, color:"#555", marginBottom:14 }}>
                  Напиши перевод на русском. Невыученные слова войдут в следующий набор:
                </div>
                {reviewDue.map(item => (
                  <div key={item.word} style={{ marginBottom:10, background:"#fff", border:"1px solid #E5E5E5", borderRadius:8, padding:"13px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:9 }}>
                      <span style={{ fontSize:15, fontWeight:700 }}>{item.word}</span>
                      <button onClick={() => speak(item.word)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15 }}>🔊</button>
                    </div>
                    <input type="text" value={reviewAnswers[item.word] || ""}
                      onChange={e => setReviewAnswers(prev => ({ ...prev, [item.word]: e.target.value }))}
                      placeholder="Перевод на русском..." disabled={!!reviewResults}
                      style={{ width:"100%", border:"1px solid #E5E5E5", borderRadius:6, padding:"8px 11px", fontSize:14, outline:"none" }} />
                    {reviewResults && reviewResults[item.word] && (
                      <div style={{ marginTop:7, fontSize:13, color: reviewResults[item.word].correct ? "#16A34A" : "#DC2626" }}>
                        {reviewResults[item.word].correct ? "✅ Верно!" : `❌ Правильно: ${reviewResults[item.word].expected} — добавлено в следующий набор`}
                      </div>
                    )}
                  </div>
                ))}
                {!reviewResults ? (
                  <button onClick={checkReview}
                    style={{ width:"100%", padding:13, background:"#111", color:"#fff", border:"none", borderRadius:8, fontSize:14, fontWeight:600, cursor:"pointer", marginTop:6 }}>
                    Проверить перевод
                  </button>
                ) : (
                  <div style={{ marginTop:14, padding:14, background:"#F0FFF4", borderRadius:8, border:"1px solid #BBF7D0" }}>
                    <div style={{ fontWeight:600, color:"#16A34A" }}>
                      Результат: {Object.values(reviewResults).filter(r => r.correct).length} / {reviewDue.length}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === "stats" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
              {[
                { label:"Изучено слов", value:state.learnedCount },
                { label:"Наборов пройдено", value:state.currentBatch },
                { label:"Прогресс", value:`${progress}%` },
                { label:"На повторении", value:(state.reviewQueue||[]).length },
                { label:"Невыученных", value:(state.failedWords||[]).length },
                { label:"Осталось слов", value:ALL_ITEMS.length - state.learnedCount },
              ].map(stat => (
                <div key={stat.label} style={{ background:"#fff", border:"1px solid #E5E5E5", borderRadius:8, padding:"16px" }}>
                  <div style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.02em" }}>{stat.value}</div>
                  <div style={{ fontSize:11, color:"#888", marginTop:4, textTransform:"uppercase", letterSpacing:"0.08em" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background:"#fff", border:"1px solid #E5E5E5", borderRadius:8, padding:14, marginBottom:12 }}>
              <div style={{ fontWeight:600, fontSize:13, marginBottom:8 }}>Прогресс</div>
              <div style={{ height:8, background:"#F0F0F0", borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:"100%", background:"#111", width:`${progress}%`, borderRadius:4 }} />
              </div>
              <div style={{ fontSize:12, color:"#888", marginTop:6 }}>{state.learnedCount} из {ALL_ITEMS.length} слов и фраз</div>
            </div>

            <div style={{ background:"#FFF8E6", border:"1px solid #FFE099", borderRadius:8, padding:14, marginBottom:12 }}>
              <div style={{ fontWeight:600, fontSize:13, marginBottom:4 }}>💬 Как практиковать</div>
              <div style={{ fontSize:13, color:"#555", lineHeight:1.6 }}>
                Открой новый чат с Claude и попроси: "Давай попрактикуем слова из моего списка. Вот слова этой недели: [вставь слова]". Claude исправит ошибки и объяснит на русском!
              </div>
            </div>

            <button onClick={() => { if (confirm("Сбросить прогресс?")) { saveUserState(currentUser.id, getInitialState()); setState(getInitialState()); }}}
              style={{ padding:"9px 18px", background:"none", border:"1px solid #E5E5E5", borderRadius:8, fontSize:13, color:"#888", cursor:"pointer" }}>
              Сбросить прогресс
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
