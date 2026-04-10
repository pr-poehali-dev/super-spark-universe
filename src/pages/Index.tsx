import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type Product = { id: number; name: string; category: string; price: string; desc: string; author: string };
type Job = { id: number; title: string; company: string; location: string; salary: string; type: string; desc: string };
type Message = { id: number; role: 'user' | 'alexa'; text: string };

const CATEGORIES = ['Игры', 'Музыка', 'Видео', 'Изображения', 'Код', 'Другое'];
const JOB_TYPES = ['Полная занятость', 'Частичная занятость', 'Фриланс', 'Стажировка'];
const CAT_ICONS: Record<string, string> = {
  'Игры': 'Gamepad2', 'Музыка': 'Music', 'Видео': 'Video',
  'Изображения': 'Image', 'Код': 'Code', 'Другое': 'Package'
};

const ALEXA_REPLIES: Record<string, string> = {
  'привет': 'Привет! Чем могу помочь? 😊',
  'как дела': 'Отлично! Готова помочь с любыми задачами.',
  'что умеешь': 'Я могу отвечать на вопросы, помогать с идеями, объяснять темы. Скоро научусь создавать сайты и генерировать изображения!',
  'создай сайт': 'Функция в разработке. Скоро ты опишешь сайт словами — и я его создам!',
  'помощь': 'Конечно! Напиши свой вопрос и я постараюсь помочь.',
  'что такое перты': 'Перты — это внутренняя валюта SuperSpark. Используй их для покупок на маркетплейсе!',
  'суперспарк': 'SuperSpark — это социальная сеть нового поколения с маркетплейсом, вакансиями и мной, Алексой!',
};

const THEMES: Record<string, string> = {
  dark: 'dark',
  'dark-purple': 'theme-dark-purple dark',
  'dark-blue': 'theme-dark-blue dark',
  'dark-red': 'theme-dark-red dark',
  'dark-green': 'theme-dark-green dark',
  'white-red': 'theme-white-red',
  'white-purple': 'theme-white-purple',
  'white-blue': 'theme-white-blue',
  'white-green': 'theme-white-green',
};

const THEME_LABELS: Record<string, string> = {
  dark: 'Тёмная',
  'dark-purple': 'Тёмно-фиолетовая',
  'dark-blue': 'Тёмно-синяя',
  'dark-red': 'Тёмно-красная',
  'dark-green': 'Тёмно-зелёная',
  'white-red': 'Бело-красная',
  'white-purple': 'Бело-фиолетовая',
  'white-blue': 'Бело-синяя',
  'white-green': 'Бело-зелёная',
};

export default function Index() {
  const [tab, setTab] = useState('home');
  const [theme, setTheme] = useState('dark');

  const [products, setProducts] = useState<Product[]>([]);
  const [prodForm, setProdForm] = useState({ name: '', category: 'Игры', price: '', desc: '', author: '' });
  const [prodOpen, setProdOpen] = useState(false);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobForm, setJobForm] = useState({ title: '', company: '', location: '', salary: '', type: 'Полная занятость', desc: '' });
  const [jobOpen, setJobOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'alexa', text: 'Привет! Я Алекса — ИИ-помощник SuperSpark. Спрашивай что угодно — помогу!' }
  ]);
  const [alexaInput, setAlexaInput] = useState('');
  const [alexaTyping, setAlexaTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, alexaTyping]);

  const handleTheme = (val: string) => {
    setTheme(val);
    document.documentElement.className = THEMES[val] ?? 'dark';
  };

  const addProduct = () => {
    if (!prodForm.name || !prodForm.price || !prodForm.author) return;
    setProducts(prev => [...prev, { ...prodForm, id: Date.now() }]);
    setProdForm({ name: '', category: 'Игры', price: '', desc: '', author: '' });
    setProdOpen(false);
  };

  const addJob = () => {
    if (!jobForm.title || !jobForm.company) return;
    setJobs(prev => [...prev, { ...jobForm, id: Date.now() }]);
    setJobForm({ title: '', company: '', location: '', salary: '', type: 'Полная занятость', desc: '' });
    setJobOpen(false);
  };

  const sendAlexaMessage = () => {
    if (!alexaInput.trim() || alexaTyping) return;
    const text = alexaInput.trim();
    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setAlexaInput('');
    setAlexaTyping(true);
    const lower = text.toLowerCase();
    const match = Object.entries(ALEXA_REPLIES).find(([key]) => lower.includes(key));
    const reply = match
      ? match[1]
      : 'Интересный вопрос! Я ещё учусь — скоро смогу ответить точнее. Попробуй спросить что-то ещё!';
    setTimeout(() => {
      setAlexaTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'alexa', text: reply }]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">SS</span>
            </div>
            <span className="text-xl font-black tracking-tight gradient-text">SuperSpark</span>
            <Badge variant="outline" className="text-xs hidden sm:flex">Beta</Badge>
          </div>
          <Select value={theme} onValueChange={handleTheme}>
            <SelectTrigger className="w-[160px] h-9 text-sm">
              <Icon name="Palette" size={14} className="mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(THEME_LABELS).map(([val, label]) => (
                <SelectItem key={val} value={val}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full grid grid-cols-5 mb-8 h-12">
            <TabsTrigger value="home" className="gap-1.5">
              <Icon name="Home" size={16} /><span className="hidden sm:inline text-xs">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="gap-1.5">
              <Icon name="ShoppingBag" size={16} /><span className="hidden sm:inline text-xs">Маркет</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-1.5">
              <Icon name="Briefcase" size={16} /><span className="hidden sm:inline text-xs">Вакансии</span>
            </TabsTrigger>
            <TabsTrigger value="alexa" className="gap-1.5">
              <Icon name="Sparkles" size={16} /><span className="hidden sm:inline text-xs">Алекса</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5">
              <Icon name="Settings" size={16} /><span className="hidden sm:inline text-xs">Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* HOME */}
          <TabsContent value="home" className="animate-fade-in space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 p-8 sm:p-12"
              style={{ background: 'linear-gradient(135deg, hsl(var(--primary)/0.2) 0%, hsl(var(--secondary)/0.15) 50%, hsl(var(--accent)/0.1) 100%)' }}>
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '28px 28px' }} />
              <div className="relative">
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">🚀 Открытая бета</Badge>
                <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
                  Добро пожаловать<br />
                  <span className="gradient-text">в SuperSpark</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl mb-8">
                  Социальная сеть нового поколения — маркетплейс, вакансии и ИИ-помощник Алекса в одном месте.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" onClick={() => setTab('marketplace')} className="font-bold">
                    <Icon name="ShoppingBag" size={18} className="mr-2" />Маркетплейс
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setTab('alexa')}>
                    <Icon name="Sparkles" size={18} className="mr-2" />Спросить Алексу
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: 'ShoppingCart', title: 'Маркетплейс', desc: 'Покупай и продавай игры, музыку, видео и другой контент', tab: 'marketplace' },
                { icon: 'Briefcase', title: 'Вакансии', desc: 'Найди работу или разместите вакансию', tab: 'jobs' },
                { icon: 'Sparkles', title: 'ИИ Алекса', desc: 'Задавай вопросы умному помощнику SuperSpark', tab: 'alexa' },
              ].map(item => (
                <Card
                  key={item.title}
                  className="p-6 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all group"
                  onClick={() => setTab(item.tab)}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon name={item.icon} size={22} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Link" size={18} className="text-primary" />Официальные ссылки
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <a href="https://t.me/ID_Spark" target="_blank" rel="noopener noreferrer">
                    <Icon name="Send" size={16} className="mr-2" />Telegram ID-Spark
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://t.me/Danii_music_Original" target="_blank" rel="noopener noreferrer">
                    <Icon name="Music" size={16} className="mr-2" />Danii Music
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.anything.com/invite/xxqxdx6s" target="_blank" rel="noopener noreferrer">
                    <Icon name="UserPlus" size={16} className="mr-2" />Пригласить друга
                  </a>
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* MARKETPLACE */}
          <TabsContent value="marketplace" className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black">Маркетплейс</h2>
                <p className="text-muted-foreground mt-1">Добавляй и покупай контент</p>
              </div>
              <Dialog open={prodOpen} onOpenChange={setProdOpen}>
                <DialogTrigger asChild>
                  <Button><Icon name="Plus" size={16} className="mr-2" />Добавить товар</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader><DialogTitle>Новый товар</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Название *</label>
                      <Input placeholder="Название товара..." value={prodForm.name}
                        onChange={e => setProdForm(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Категория</label>
                      <Select value={prodForm.category} onValueChange={v => setProdForm(p => ({ ...p, category: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Цена (в Пертах) *</label>
                      <Input placeholder="Например: 500" value={prodForm.price}
                        onChange={e => setProdForm(p => ({ ...p, price: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Описание</label>
                      <Textarea placeholder="Расскажи о своём товаре..." value={prodForm.desc} rows={3}
                        onChange={e => setProdForm(p => ({ ...p, desc: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Твоё имя / ник *</label>
                      <Input placeholder="Как тебя зовут?" value={prodForm.author}
                        onChange={e => setProdForm(p => ({ ...p, author: e.target.value }))} />
                    </div>
                    <Button className="w-full" onClick={addProduct}
                      disabled={!prodForm.name || !prodForm.price || !prodForm.author}>
                      Опубликовать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {products.length === 0 ? (
              <Card className="p-16 text-center border-dashed">
                <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-bold mb-2">Пока пусто</h3>
                <p className="text-muted-foreground mb-6">Будь первым — добавь свой товар!</p>
                <Button onClick={() => setProdOpen(true)}>
                  <Icon name="Plus" size={16} className="mr-2" />Добавить первый товар
                </Button>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(p => (
                  <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-all hover:border-primary/40">
                    <div className="h-36 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon name={CAT_ICONS[p.category] || 'Package'} size={40} className="text-primary/60" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-base line-clamp-1">{p.name}</h3>
                        <Badge variant="secondary" className="text-xs ml-2 shrink-0">{p.category}</Badge>
                      </div>
                      {p.desc && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.desc}</p>}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-black text-primary text-lg">{p.price} Пертов</p>
                          <p className="text-xs text-muted-foreground">от {p.author}</p>
                        </div>
                        <Button size="sm"><Icon name="ShoppingCart" size={14} className="mr-1" />Купить</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* JOBS */}
          <TabsContent value="jobs" className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black">Вакансии</h2>
                <p className="text-muted-foreground mt-1">Найди работу или найди сотрудника</p>
              </div>
              <Dialog open={jobOpen} onOpenChange={setJobOpen}>
                <DialogTrigger asChild>
                  <Button><Icon name="Plus" size={16} className="mr-2" />Создать вакансию</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader><DialogTitle>Новая вакансия</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Должность *</label>
                      <Input placeholder="Например: Frontend разработчик" value={jobForm.title}
                        onChange={e => setJobForm(p => ({ ...p, title: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Компания / Имя *</label>
                      <Input placeholder="Название компании или ваше имя" value={jobForm.company}
                        onChange={e => setJobForm(p => ({ ...p, company: e.target.value }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Город / Место</label>
                        <Input placeholder="Москва / Удалённо" value={jobForm.location}
                          onChange={e => setJobForm(p => ({ ...p, location: e.target.value }))} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Зарплата</label>
                        <Input placeholder="от 50 000 ₽" value={jobForm.salary}
                          onChange={e => setJobForm(p => ({ ...p, salary: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Тип занятости</label>
                      <Select value={jobForm.type} onValueChange={v => setJobForm(p => ({ ...p, type: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{JOB_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Описание</label>
                      <Textarea placeholder="Что нужно делать? Какие требования?" value={jobForm.desc} rows={3}
                        onChange={e => setJobForm(p => ({ ...p, desc: e.target.value }))} />
                    </div>
                    <Button className="w-full" onClick={addJob} disabled={!jobForm.title || !jobForm.company}>
                      Опубликовать вакансию
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {jobs.length === 0 ? (
              <Card className="p-16 text-center border-dashed">
                <Icon name="Briefcase" size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-bold mb-2">Вакансий пока нет</h3>
                <p className="text-muted-foreground mb-6">Разместите первую вакансию или предложите услуги!</p>
                <Button onClick={() => setJobOpen(true)}>
                  <Icon name="Plus" size={16} className="mr-2" />Создать вакансию
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {jobs.map(job => (
                  <Card key={job.id} className="p-6 hover:shadow-lg hover:border-primary/40 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                        <p className="font-medium text-primary mb-1">{job.company}</p>
                        {job.desc && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{job.desc}</p>}
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          {job.location && <span className="flex items-center gap-1"><Icon name="MapPin" size={14} />{job.location}</span>}
                          {job.salary && <span className="flex items-center gap-1 text-foreground font-semibold"><Icon name="Banknote" size={14} />{job.salary}</span>}
                        </div>
                      </div>
                      <Button className="shrink-0">Откликнуться</Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ALEXA */}
          <TabsContent value="alexa" className="animate-fade-in">
            <div className="flex flex-col" style={{ height: 'calc(100vh - 260px)', minHeight: '520px' }}>
              <div className="flex items-center gap-4 mb-5 p-5 rounded-2xl border border-violet-500/20"
                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.08) 50%, rgba(236,72,153,0.08) 100%)' }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shrink-0">
                  <Icon name="Sparkles" size={26} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Алекса</h2>
                  <p className="text-sm text-muted-foreground">ИИ-помощник SuperSpark · задай любой вопрос</p>
                </div>
                <Badge variant="outline" className="ml-auto">Бета</Badge>
              </div>

              <Card className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'alexa' && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0 mt-1">
                          <Icon name="Sparkles" size={14} className="text-white" />
                        </div>
                      )}
                      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted rounded-bl-sm'
                      }`}>
                        {msg.text}
                      </div>
                      {msg.role === 'user' && (
                        <Avatar className="w-8 h-8 shrink-0 mt-1">
                          <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">Вы</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {alexaTyping && (
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
                        <Icon name="Sparkles" size={14} className="text-white" />
                      </div>
                      <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center h-10">
                        <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Спроси Алексу что-нибудь..."
                      value={alexaInput}
                      onChange={e => setAlexaInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendAlexaMessage()}
                      disabled={alexaTyping}
                    />
                    <Button onClick={sendAlexaMessage} disabled={!alexaInput.trim() || alexaTyping} size="icon">
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['Что умеешь?', 'Привет!', 'Что такое Перты?', 'Создай сайт'].map(s => (
                      <button
                        key={s}
                        onClick={() => setAlexaInput(s)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* SETTINGS */}
          <TabsContent value="settings" className="animate-fade-in">
            <Card className="p-8 max-w-lg mx-auto">
              <h2 className="text-2xl font-black mb-6">Настройки</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Тема оформления</label>
                  <Select value={theme} onValueChange={handleTheme}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(THEME_LABELS).map(([val, label]) => (
                        <SelectItem key={val} value={val}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Язык интерфейса</label>
                  <Select defaultValue="ru">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2 border-t space-y-3">
                  <p className="text-xs text-muted-foreground">SuperSpark Beta v1.0 · 2026 · Создано ID-Spark</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://t.me/ID_Spark" target="_blank" rel="noopener noreferrer">Поддержка</a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://t.me/ID_Spark" target="_blank" rel="noopener noreferrer">Сообщить о баге</a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="border-t mt-12 py-6 text-center text-sm text-muted-foreground">
        © 2026 SuperSpark · Создано{' '}
        <a href="https://t.me/ID_Spark" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          ID-Spark
        </a>
      </footer>
    </div>
  );
}