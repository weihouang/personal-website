import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Preload, Text, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { animateScroll as scroll } from 'react-scroll';
import { motion } from 'framer-motion-3d';
import { useSection } from '../hooks/useSection';
const HeroText: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [fontSize, setFontSize] = useState<number>(5);
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFontSize(3);
      } else {
        setFontSize(5);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const targetY = visible ? 0 : 50;
      const targetScale = visible ? 1 : 0;
      
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.05
      );
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05)
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Text
        position={[0, 0, 0]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        Hi, I'm Wei-Ho Uang
        <meshStandardMaterial 
          attach="material" 
          side={THREE.DoubleSide}
          emissive={isHovered ? "#3B82F6" : "#000000"}
          emissiveIntensity={isHovered ? 0.5 : 0}
        />
      </Text>

    </group>
  );
};

const FloatingParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null!);
  const [particlesCount, setParticlesCount] = useState<number>(1000);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setParticlesCount(500);
      } else {
        setParticlesCount(1000);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 100; 
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100; 
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.05;
    ref.current.position.y = Math.sin(time * 0.5) * 0.3;
  });

  return (
    <Points 
      ref={ref} 
      positions={positions} 
      stride={3} 
      frustumCulled
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color='#93C5FD'
        opacity={1}
      />
    </Points>
  );
};

const DownArrow: React.FC = () => {
  const handleClick = () => {
    scroll.scrollTo(document.getElementById('about')?.offsetTop || 0, {
      duration: 800,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <motion.group
      onClick={handleClick}
      onPointerOver={(e) => ((e.object as THREE.Mesh).material as THREE.MeshStandardMaterial).color = new THREE.Color('hotpink')}
      onPointerOut={(e) => ((e.object as THREE.Mesh).material as THREE.MeshStandardMaterial).color = new THREE.Color('#ffffff')}
      animate={{ y: [0, -10, 0], opacity: 1 }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
    >
      <mesh position={[0, -20, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0, 2, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </motion.group>
  );
};

const AmbientEffects: React.FC = () => {
  return (
    <>
      <fog attach="fog" args={['#1E293B', 30, 90]} />
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={2.5}
        color="#ffffff"
        castShadow
      />
      <pointLight
        position={[-10, -10, -5]}
        intensity={1.5}
        color="#60A5FA"
        distance={50}
        decay={2}
      />
      <pointLight
        position={[10, -5, 5]}
        intensity={1.2}
        color="#93C5FD"
        distance={50}
        decay={2}
      />
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#60A5FA"
        intensity={0.8}
      />
    </>
  );
};



const SpacePrompt: React.FC<{ section: number }> = ({ section }) => {
  const [isVisible, setIsVisible] = useState(true);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    setIsVisible(Math.sin(time * 2) > 0);
  });

  return (
    <group position={[0, -15, 0]}>
      <Text
        position={[0, 0, 0]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        opacity={isVisible ? 0.8 : 0.3}
      >
        {section === 0 && "Press SPACE and ESC to explore"}
        <meshStandardMaterial 
          attach="material" 
          side={THREE.DoubleSide}
          emissive="#3B82F6"
          emissiveIntensity={0.2}
        />
      </Text>
    </group>
  );
};

const AboutSection3D: React.FC<{ visible: boolean }> = ({ visible }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hoveredParagraph, setHoveredParagraph] = useState<number | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetY = visible ? 0 : 50;
      const targetOpacity = visible ? 1 : 0;
      const time = state.clock.getElapsedTime();
      
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.05
      );
      
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.opacity = THREE.MathUtils.lerp(
            child.material.opacity,
            targetOpacity,
            0.05
          );
        }
      });

      // Add subtle floating animation
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.03;
    }
  });

  const paragraphs = [
    "I'm a Full Stack Developer passionate about creating innovative web experiences.",
    "With expertise in modern web technologies, I focus on building scalable applications.",
    "I love turning complex problems into elegant, user-friendly solutions."
  ];

  return (
    <group ref={groupRef} position={[0, 50, 0]} visible={visible}>
      <Text
        position={[0, 8, 0]}
        fontSize={4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        About Me
        <meshStandardMaterial 
          attach="material" 
          side={THREE.DoubleSide}
          emissive="#3B82F6"
          emissiveIntensity={0.4}
          transparent
        />
      </Text>
      
      {paragraphs.map((text, index) => (
        <group 
          key={index} 
          position={[0, 2 - (index * 4), 0]}
          onPointerOver={() => setHoveredParagraph(index)}
          onPointerOut={() => setHoveredParagraph(null)}
        >
          <Text
            fontSize={1.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={25}
            textAlign="center"
          >
            {text}
            <meshStandardMaterial 
              attach="material" 
              side={THREE.DoubleSide}
              emissive="#3B82F6"
              emissiveIntensity={hoveredParagraph === index ? 0.4 : 0}
              transparent
              opacity={hoveredParagraph === index ? 1 : 0.8}
            />
          </Text>
          {hoveredParagraph === index && (
            <mesh position={[0, -1, -1]} scale={[20, 0.05, 1]}>
              <planeGeometry />
              <meshStandardMaterial 
                color="#3B82F6"
                transparent
                opacity={0.2}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame(() => {
    if (hovered) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        Math.PI * 0.1,
        0.1
      )
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        2,
        0.1
      )
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        0,
        0.1
      )
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        0,
        0.1
      )
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, -index * 8, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[12, 6]} />
      <meshStandardMaterial
        color={hovered ? "#1E40AF" : "#1E293B"}
        metalness={0.5}
        roughness={0.5}
      />
      {/* Project content */}
    </mesh>
  )
}

const ProjectSection3D: React.FC<{ visible: boolean }> = ({ visible }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useFrame(() => {
    if (groupRef.current) {
      const targetY = visible ? 0 : 50;
      const targetOpacity = visible ? 1 : 0;
      
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.05
      );
      
      // Update opacity of all text meshes
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.opacity = THREE.MathUtils.lerp(
            child.material.opacity,
            targetOpacity,
            0.05
          );
        }
      });
    }
  });

  const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application",
      tech: "React, Node.js, TypeScript"
    },
    {
      title: "Project 2",
      description: "Real-time data visualization",
      tech: "Three.js, WebGL, D3.js"
    },
    {
      title: "Project 3",
      description: "Cloud-native microservices",
      tech: "Docker, Kubernetes, AWS"
    }
  ];

  return (
    <group ref={groupRef} position={[0, 50, 0]} visible={visible}>
      <Text
        position={[0, 8, 0]}
        fontSize={4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Projects
        <meshStandardMaterial 
          attach="material" 
          side={THREE.DoubleSide}
          emissive="#3B82F6"
          emissiveIntensity={0.2}
          transparent
        />
      </Text>

      <group position={[0, -2, 0]}>
        {projects.map((project, index) => (
          <group 
            key={index}
            position={[0, -index * 6, 0]}
            onPointerOver={() => setHoveredProject(index)}
            onPointerOut={() => setHoveredProject(null)}
          >
            <Text
              position={[0, 0, 0]}
              fontSize={1.5}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              opacity={hoveredProject === index ? 1 : 0.7}
            >
              {project.title}
              <meshStandardMaterial 
                attach="material" 
                side={THREE.DoubleSide}
                transparent
              />
            </Text>
            {hoveredProject === index && (
              <>
                <Text
                  position={[0, -1.5, 0]}
                  fontSize={1}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  opacity={0.7}
                >
                  {project.description}
                  <meshStandardMaterial 
                    attach="material" 
                    side={THREE.DoubleSide}
                    transparent
                  />
                </Text>
                <Text
                  position={[0, -2.5, 0]}
                  fontSize={0.8}
                  color="#3B82F6"
                  anchorX="center"
                  anchorY="middle"
                >
                  {project.tech}
                  <meshStandardMaterial 
                    attach="material" 
                    side={THREE.DoubleSide}
                    transparent
                  />
                </Text>
              </>
            )}
          </group>
        ))}
      </group>
    </group>
  );
};

const SkillsSection3D: React.FC<{ visible: boolean }> = ({ visible }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const sphereRefs = useRef<THREE.Mesh[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetY = visible ? 0 : 50;
      const targetOpacity = visible ? 1 : 0;
      const time = state.clock.getElapsedTime();
      
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.05
      );

      sphereRefs.current.forEach((sphere, index) => {
        if (sphere) {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const baseX = (col - 1.5) * 8;
          const baseY = (row - 1) * 8;
          
          sphere.position.x = baseX;
          sphere.position.y = baseY + Math.sin(time + index) * 0.5;
          sphere.position.z = Math.sin(time * 0.5 + index) * 0.5;
          
          sphere.rotation.x = time * 0.5;
          sphere.rotation.y = time * 0.3;
          
          if (sphere.material instanceof THREE.MeshStandardMaterial) {
            sphere.material.opacity = THREE.MathUtils.lerp(
              sphere.material.opacity,
              targetOpacity,
              0.05
            );
          }
        }
      });
    }
  });

  const skills = [
    { name: "React", color: "#61DAFB" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Node.js", color: "#339933" },
    { name: "Three.js", color: "#000000" },
    { name: "Docker", color: "#2496ED" },
    { name: "AWS", color: "#FF9900" },
    { name: "PostgreSQL", color: "#4169E1" },
    { name: "Python", color: "#3776AB" }
  ];

  return (
    <group ref={groupRef} position={[0, 50, 0]} visible={visible}>
      <Text
        position={[0, 12, 0]}
        fontSize={4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Skills
        <meshStandardMaterial 
          attach="material" 
          side={THREE.DoubleSide}
          emissive="#3B82F6"
          emissiveIntensity={0.2}
          transparent
        />
      </Text>

      {skills.map((skill, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const baseX = (col - 1.5) * 8;
        const baseY = (row - 1) * 8;

        return (
          <group key={index}>
            <mesh
              position={[baseX, baseY, 0]}
              ref={el => {
                if (el) sphereRefs.current[index] = el;
              }}
              onPointerOver={() => setHoveredSkill(index)}
              onPointerOut={() => setHoveredSkill(null)}
            >
              <sphereGeometry args={[1.5, 32, 32]} />
              <meshStandardMaterial 
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={hoveredSkill === index ? 0.8 : 0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
            {hoveredSkill === index && (
              <Text
                position={[baseX, baseY - 3, 0]}
                fontSize={0.8}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {skill.name}
                <meshStandardMaterial 
                  attach="material" 
                  side={THREE.DoubleSide}
                  transparent
                />
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
};

const CameraController: React.FC<{ section: number }> = ({ section }) => {
  const { camera } = useThree()
  
  useFrame(() => {
    const targetPosition = new THREE.Vector3()
    switch (section) {
      case 0:
        targetPosition.set(0, 0, 50)
        break
      case 1:
        targetPosition.set(-20, 0, 40)
        break
      case 2:
        targetPosition.set(20, 0, 40)
        break
      case 3:
        targetPosition.set(0, 20, 40)
        break
    }
    
    camera.position.lerp(targetPosition, 0.05)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Update the main Background3D component:
const Background3D: React.FC = () => {
  const { currentSection } = useSection();

  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 75 }}
      className="absolute top-0 left-0 w-full h-full z-0"
      gl={{ 
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.5
      }}
    >
      <color attach="background" args={['#0A1929']} />
      <AmbientEffects />
      <Stars 
        radius={100} 
        depth={50} 
        count={7000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={1.5} 
      />
      <FloatingParticles />
      <HeroText visible={currentSection === 0} />
      <AboutSection3D visible={currentSection === 1} />
      <ProjectSection3D visible={currentSection === 2} />
      <SkillsSection3D visible={currentSection === 3} />
      {currentSection === 0 && <SpacePrompt section={currentSection} />}
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        enableDamping
        dampingFactor={0.05}
      />
      <Preload all />
    </Canvas>
  );
};

export default Background3D;