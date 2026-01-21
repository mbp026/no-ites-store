import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white py-24">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            We believe in a world without divisions. A world where we see each other
            as one human family, united in purpose and love.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              "No manner of -ites" is more than a clothing brand. It's a movement.
              A reminder that labels divide us, but our shared humanity unites us.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              In a world that constantly tries to categorize and separate us—by
              politics, religion, race, class—we choose to stand together. Our
              clothing carries a simple but powerful message: we are one.
            </p>
            <p className="text-lg text-gray-600">
              Every piece we create is designed to start conversations, challenge
              assumptions, and remind us all that beneath our differences, we
              share the same hopes, dreams, and desire for connection.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8">
              <h3 className="text-xl font-semibold mb-4">Unity Over Division</h3>
              <p className="text-gray-600">
                We reject the labels that separate us. There should be no -ites
                among us—no groups pitted against each other. Just people,
                standing together.
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="text-xl font-semibold mb-4">Quality With Purpose</h3>
              <p className="text-gray-600">
                Every piece is crafted with care using premium materials and
                ethical manufacturing. When you wear our clothing, you wear
                a statement that lasts.
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="text-xl font-semibold mb-4">Community Impact</h3>
              <p className="text-gray-600">
                A portion of every sale supports community-building initiatives
                that bring people together across traditional divides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why "No Manner of -ites"?</h2>
            <p className="text-lg text-gray-600 mb-6">
              The suffix "-ites" has historically been used to create divisions—
              to define groups in opposition to one another. Israelites vs Canaanites.
              Democrats vs Republicans. Urban vs Rural.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We believe these divisions are artificial. When we strip away the
              labels, we find that we share far more in common than what separates us.
            </p>
            <p className="text-xl font-medium text-black">
              No manner of -ites. Just us. Together.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Wear the message. Start the conversation. Be part of something bigger.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Shop the Collection
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
