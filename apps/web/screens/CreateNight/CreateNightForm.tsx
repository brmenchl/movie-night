import { useCreateNight } from '@packages/nights';
import Link from 'next/link';
import { ComponentProps, useCallback, useRef, useState } from 'react';
import Schema from 'rsuite/Schema';
import Form from 'rsuite/Form';
import type { FormInstance } from 'rsuite/Form';
import Button from 'rsuite/Button';
import ButtonToolbar from 'rsuite/ButtonToolbar';

const themeRule = Schema.Types.StringType().isRequired('Gotta add a theme!');
const dateRule = Schema.Types.DateType().isRequired('Enter a date');

export const CreateNightForm = () => {
  const formRef = useRef<FormInstance>(null);
  const [theme, setTheme] = useState('');
  const [date, setDate] = useState('');
  const createNight = useCreateNight();

  const createNightFromInput = useCallback(() => {
    if (formRef.current?.check()) {
      createNight({ theme, date: new Date(date) });
      setDate('');
      setTheme('');
    }
  }, [createNight, date, theme]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 80,
      }}
    >
      <Form ref={formRef}>
        <Form.Group controlId="date">
          <Form.ControlLabel>Date</Form.ControlLabel>
          <Form.Control
            name="date"
            type="date"
            rule={dateRule}
            value={date}
            onChange={setDate}
          />
        </Form.Group>
        <Form.Group controlId="theme">
          <Form.ControlLabel>Theme</Form.ControlLabel>
          <Form.Control
            name="theme"
            rule={themeRule}
            value={theme}
            onChange={setTheme}
            placeholder="Pick a good one"
          />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" onClick={createNightFromInput}>
              Submit
            </Button>
            <LinkButton href="/" appearance="default">
              Cancel
            </LinkButton>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
};

const LinkButton = ({
  href,
  ...buttonProps
}: { href: string } & Pick<
  ComponentProps<typeof Button>,
  'children' | 'appearance'
>) => (
  <Link href={href} passHref legacyBehavior>
    <Button as={'a'} {...buttonProps} />
  </Link>
);
