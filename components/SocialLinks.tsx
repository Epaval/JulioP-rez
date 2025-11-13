'use client';

export default function SocialLinks() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/tuusuario',
      icon: '🐱',
      color: 'hover:text-gray-800'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/tuusuario',
      icon: '💼',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/tuusuario',
      icon: '🐦',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      url: 'mailto:tuemail@example.com',
      icon: '✉️',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <div className="flex space-x-6 justify-center">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-3xl transition duration-300 ${social.color}`}
          title={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}