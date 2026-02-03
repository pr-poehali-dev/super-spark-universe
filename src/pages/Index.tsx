import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  const [pertsBalance, setPertsBalance] = useState(1500);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [alexaMessage, setAlexaMessage] = useState('');

  const themes = [
    { value: 'dark', label: 'Тёмная', class: 'dark' },
    { value: 'dark-red', label: 'Тёмно-красная', class: 'theme-dark-red dark' },
    { value: 'dark-green', label: 'Тёмно-зелёная', class: 'theme-dark-green dark' },
    { value: 'dark-purple', label: 'Тёмно-фиолетовая', class: 'theme-dark-purple dark' },
    { value: 'dark-blue', label: 'Тёмно-синяя', class: 'theme-dark-blue dark' },
    { value: 'white-red', label: 'Бело-красная', class: 'theme-white-red' },
    { value: 'white-purple', label: 'Бело-фиолетовая', class: 'theme-white-purple' },
    { value: 'white-blue', label: 'Бело-синяя', class: 'theme-white-blue' },
    { value: 'white-green', label: 'Бело-зелёная', class: 'theme-white-green' },
  ];

  const handleThemeChange = (value: string) => {
    setCurrentTheme(value);
    const theme = themes.find(t => t.value === value);
    if (theme) {
      document.documentElement.className = theme.class;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">SS</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text">SuperSpark</h1>
            <Badge variant="outline" className="ml-2">v1.0</Badge>
          </div>

          <div className="flex items-center gap-4">
            <Card className="px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10">
              <Icon name="Coins" className="text-accent" size={20} />
              <span className="font-semibold">{pertsBalance}</span>
              <span className="text-sm text-muted-foreground">Перты</span>
            </Card>

            <Select value={currentTheme} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-[180px]">
                <Icon name="Palette" size={16} className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {themes.map(theme => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">ID</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-7 w-full mb-6 h-auto p-1 animate-slide-up">
            <TabsTrigger value="home" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Home" size={20} />
              <span className="text-xs">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex flex-col items-center gap-1 py-3">
              <Icon name="ShoppingBag" size={20} />
              <span className="text-xs">Маркетплейс</span>
            </TabsTrigger>
            <TabsTrigger value="chats" className="flex flex-col items-center gap-1 py-3">
              <Icon name="MessageCircle" size={20} />
              <span className="text-xs">Чаты</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Briefcase" size={20} />
              <span className="text-xs">Вакансии</span>
            </TabsTrigger>
            <TabsTrigger value="alexa" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Sparkles" size={20} />
              <span className="text-xs">Алекса</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center gap-1 py-3">
              <Icon name="User" size={20} />
              <span className="text-xs">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Settings" size={20} />
              <span className="text-xs">Настройки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="animate-fade-in">
            <div className="grid gap-6">
              <Card className="p-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-none">
                <h2 className="text-4xl font-bold mb-4">Добро пожаловать в SuperSpark!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Универсальная социальная сеть с маркетплейсом, чатами, вакансиями и ИИ-помощником Алексой
                </p>
                <div className="flex gap-3">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Icon name="Rocket" size={20} className="mr-2" />
                    Начать
                  </Button>
                  <Button size="lg" variant="outline">
                    Узнать больше
                  </Button>
                </div>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Icon name="ShoppingCart" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Маркетплейс</h3>
                  <p className="text-muted-foreground">Игры, музыка, видео и многое другое</p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                    <Icon name="MessageSquare" size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Чаты и звонки</h3>
                  <p className="text-muted-foreground">Общайтесь с друзьями в реальном времени</p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <Icon name="Sparkles" size={24} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">ИИ Алекса</h3>
                  <p className="text-muted-foreground">Создавайте сайты и приложения с помощью ИИ</p>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Официальные каналы</h3>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" asChild>
                    <a href="https://t.me/ID_Spark" target="_blank" rel="noopener noreferrer">
                      <Icon name="Send" size={18} className="mr-2" />
                      ID-Spark
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href="https://t.me/Danii_music_Original" target="_blank" rel="noopener noreferrer">
                      <Icon name="Music" size={18} className="mr-2" />
                      Danii Music
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href="https://www.anything.com/invite/xxqxdx6s" target="_blank" rel="noopener noreferrer">
                      <Icon name="UserPlus" size={18} className="mr-2" />
                      Приглашение
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="animate-fade-in">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Игровой маркетплейс</h2>
                <Button>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Загрузить товар
                </Button>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {['Игры', 'Музыка', 'Видео', 'Изображения'].map((category, i) => (
                  <Card key={i} className="p-6 text-center hover:shadow-lg transition-all cursor-pointer">
                    <Icon name={['Gamepad2', 'Music', 'Video', 'Image'][i] as any} size={32} className="mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold">{category}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{Math.floor(Math.random() * 500 + 100)} товаров</p>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Товар #{item}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{Math.floor(Math.random() * 500 + 50)} Пертов</span>
                        <Button size="sm">
                          <Icon name="ShoppingCart" size={16} className="mr-1" />
                          Купить
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chats" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-4 md:col-span-1">
                <h3 className="font-semibold mb-4">Чаты</h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((chat) => (
                    <div key={chat} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 cursor-pointer">
                      <Avatar>
                        <AvatarFallback>U{chat}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">Пользователь {chat}</p>
                        <p className="text-sm text-muted-foreground">Последнее сообщение...</p>
                      </div>
                      <Badge variant="secondary">{chat}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 md:col-span-2 flex flex-col">
                <div className="flex items-center gap-3 pb-4 border-b mb-4">
                  <Avatar>
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">Пользователь 1</p>
                    <p className="text-sm text-muted-foreground">В сети</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Icon name="Video" size={18} className="mr-2" />
                    Видеозвонок
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="Phone" size={18} />
                  </Button>
                </div>

                <div className="flex-1 space-y-4 mb-4 min-h-[300px]">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg max-w-xs">
                      Привет! Как дела?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-2 rounded-lg max-w-xs">
                      Отлично! А у тебя?
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input placeholder="Написать сообщение..." />
                  <Button>
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="animate-fade-in">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Вакансии</h2>
                <Button>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать вакансию
                </Button>
              </div>

              <div className="grid gap-4">
                {[1, 2, 3, 4, 5].map((job) => (
                  <Card key={job} className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">Frontend разработчик</h3>
                          <Badge variant="secondary">Удалённо</Badge>
                          <Badge className="bg-green-500">Открыта</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">
                          Компания ищет опытного Frontend разработчика для работы над веб-приложениями
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Icon name="MapPin" size={16} />
                            Москва
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={16} />
                            Полная занятость
                          </span>
                          <span className="flex items-center gap-1 text-primary font-semibold">
                            <Icon name="Coins" size={16} />
                            от 150000 Пертов/мес
                          </span>
                        </div>
                      </div>
                      <Button>Откликнуться</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alexa" className="animate-fade-in">
            <div className="grid gap-6">
              <Card className="p-8 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 border-none">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Icon name="Sparkles" size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Алекса</h2>
                    <p className="text-muted-foreground">ИИ помощник от ID-Spark</p>
                  </div>
                </div>
                <p className="text-lg mb-4">
                  Создавайте веб-приложения и сайты по описанию, генерируйте изображения, видео и музыку!
                </p>
                <Badge variant="outline" className="text-sm">Требуется пароль для создания сайтов</Badge>
              </Card>

              <Card className="p-6">
                <div className="space-y-4 mb-6 min-h-[300px]">
                  <div className="flex gap-3">
                    <Avatar className="bg-gradient-to-br from-purple-500 to-blue-500">
                      <AvatarFallback className="text-white">AI</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Card className="p-4 bg-muted">
                        <p>Привет! Я Алекса, ваш ИИ-помощник. Я могу помочь вам создать веб-приложения, сайты, сгенерировать изображения и многое другое!</p>
                      </Card>
                    </div>
                  </div>

                  {alexaMessage && (
                    <div className="flex gap-3 justify-end">
                      <div className="flex-1 max-w-2xl">
                        <Card className="p-4 bg-primary text-primary-foreground">
                          <p>{alexaMessage}</p>
                        </Card>
                      </div>
                      <Avatar>
                        <AvatarFallback>ID</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input 
                    placeholder="Спросите Алексу что-нибудь..." 
                    value={alexaMessage}
                    onChange={(e) => setAlexaMessage(e.target.value)}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Icon name="Lock" size={18} className="mr-2" />
                        Создать сайт
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Введите пароль для создания сайта</DialogTitle>
                      </DialogHeader>
                      <Input type="password" placeholder="Введите пароль..." />
                      <Button className="w-full">Подтвердить</Button>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => setAlexaMessage('')}>
                    <Icon name="Send" size={18} />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Icon name="Image" size={16} className="mr-2" />
                    Изображение
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Video" size={16} className="mr-2" />
                    Видео
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Music" size={16} className="mr-2" />
                    Музыка
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Code" size={16} className="mr-2" />
                    Код
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">ID</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">ID-Spark</h2>
                <p className="text-muted-foreground mb-4">id-spark@yandex.ru</p>
                <Badge className="mb-4">Создатель SuperSpark</Badge>
                <div className="space-y-2 mt-6">
                  <Button className="w-full" variant="outline">Редактировать профиль</Button>
                  <Button className="w-full" variant="outline">Мои публикации</Button>
                </div>
              </Card>

              <Card className="p-6 md:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Статистика</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card className="p-4 bg-primary/10">
                    <p className="text-sm text-muted-foreground mb-1">Баланс Пертов</p>
                    <p className="text-2xl font-bold">{pertsBalance}</p>
                  </Card>
                  <Card className="p-4 bg-secondary/10">
                    <p className="text-sm text-muted-foreground mb-1">Покупок</p>
                    <p className="text-2xl font-bold">23</p>
                  </Card>
                  <Card className="p-4 bg-accent/10">
                    <p className="text-sm text-muted-foreground mb-1">Друзей</p>
                    <p className="text-2xl font-bold">156</p>
                  </Card>
                  <Card className="p-4 bg-green-500/10">
                    <p className="text-sm text-muted-foreground mb-1">Создано</p>
                    <p className="text-2xl font-bold">8</p>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold mb-4">Контакты</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Icon name="Mail" size={20} />
                    <span>ID-Spark@yandex.ru</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Icon name="Phone" size={20} />
                    <span>+7 (999) 123-45-67</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Настройки</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Тема оформления</h3>
                  <Select value={currentTheme} onValueChange={handleThemeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map(theme => (
                        <SelectItem key={theme.value} value={theme.value}>
                          {theme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Язык интерфейса</h3>
                  <Select defaultValue="ru">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Уведомления</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Уведомления о новых сообщениях</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Уведомления о покупках</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Синтез речи (голос мудрого мужчины)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Конфиденциальность</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Разрешить просмотр контактов</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Показывать статус онлайн</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full" variant="destructive">
                    Выйти из аккаунта
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="border-t mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            © 2026 SuperSpark. Создано ID-Spark
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://t.me/ID_Spark" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              Telegram
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
